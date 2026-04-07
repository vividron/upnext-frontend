import { useEffect, useState } from "react";
import { emitEvent, isSocketConnected, listenEvent, listenEventOnce, removeListener } from "../sockets/socket.js";
import { EVENTS } from "../sockets/socket.events.js";
import * as queueService from "../api/queue.api.js";
import toast from "react-hot-toast";

export const useQueue = (roomId, { isHost }) => {
    const [queue, setQueue] = useState([]);
    const [isAddSongsModalOpen, setIsAddSongModalOpen] = useState(false);
    const [isClearQueueModalOpen, setIsClearQueueModalOpen] = useState(false);

    const [queueLoading, setQueueLoading] = useState({
        addingPlaylist: false,
        votingSong: false,
        upvotingMatchedSong: false,
        clearingQueue: false,
    });

    const handleAddPlaylistToQueue = () => {
        setIsAddSongModalOpen(true);
    }

    const addPlaylistToQueue = async (songs) => {
        try {
            if (!isHost) {
                return toast.error("Only the room host can add songs");
            }
            setIsAddSongModalOpen(false);
            if (!songs || songs?.length === 0) return;
            setQueueLoading(prev => ({ ...prev, addingPlaylist: true }));

            await queueService.addPlaylistToQueue(roomId, songs);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setQueueLoading(prev => ({ ...prev, addingPlaylist: false }))
        }
    }

    const handleVoteSong = (songId, vote) => {
        // Restrict host from voting the song
        if (isHost) {
            return toast.error("Host cannot vote song");
        }
        setQueueLoading(prev => ({ ...prev, votingSong: true }));

        emitEvent(EVENTS.QUEUE_VOTE_SONG, { roomId, songId, vote }, (response) => {
            if (response.ok) {
                setQueue(queue => {
                    return queue.map((song) => song.songId === songId ? { ...song, vote } : song)
                })
                setQueueLoading(prev => ({ ...prev, votingSong: false }));
            }
            else {
                toast.error(response?.error?.message || "Failed to vote the song")
            }
        })
    }

    const handleMatchedSongUpVote = async (userSongs) => {
        try {
            if (isHost) {
                return toast.error("Host cannot match songs")
            }
            setQueueLoading(prev => ({ ...prev, upvotingMatchedSong: true }));

            // Find songs in the queue that match the user’s songs
            // Create a Set of user song IDs
            const userSongIds = new Set(userSongs.map(song => song.songId));
            // Filter matching songs from queue
            const matchedSongIds = queue
                .filter(song => userSongIds.has(song.songId))
                .map((song) => song.songId);

            await queueService.upvoteMatchedSongs(roomId, matchedSongIds);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setQueueLoading(prev => ({ ...prev, upvotingMatchedSong: false }))
        }
    }

    const handleClearQueue = () => {
        setIsClearQueueModalOpen(true);
    }

    const clearQueue = async () => {
        try {
            setIsClearQueueModalOpen(false);
            setQueueLoading(prev => ({ ...prev, clearingQueue: true }));
            await queueService.clearQueue(roomId);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setQueueLoading(prev => ({ ...prev, clearingQueue: false }))
        }
    }

    useEffect(() => {

        const handleAddSongs = (songs) => {
            if (!songs || songs?.length === 0) return;
            setQueue(prev => [...prev, ...songs]);
        }

        const handleSongScoreUpdate = (results) => {
            const scoreMap = new Map(results.map(([songId, score]) => [songId, score]));

            setQueue(prev => prev
                .map(song => scoreMap.has(song.songId) ? { ...song, score: scoreMap.get(song.songId) } : song)
                .sort((a, b) => (b?.score ?? 0) - (a?.score ?? 0))
            );
        }

        const handleClearQueue = () => {
            setQueue([]);
        }

        const listenQueueEvents = () => {
            listenEvent(EVENTS.QUEUE_ADD_SONGS, handleAddSongs);
            listenEvent(EVENTS.QUEUE_SCORES_UPDATED, handleSongScoreUpdate);
            listenEvent(EVENTS.QUEUE_CLEAR, handleClearQueue);
        }

        if (isSocketConnected()) {
            listenQueueEvents();
        } else {
            listenEventOnce("connect", listenQueueEvents);
        }

        return () => {
            removeListener("connect", listenQueueEvents);
            removeListener(EVENTS.QUEUE_ADD_SONGS, handleAddSongs);
            removeListener(EVENTS.QUEUE_SCORES_UPDATED, handleSongScoreUpdate);
            removeListener(EVENTS.QUEUE_CLEAR, handleClearQueue);
        }
    }, [roomId]);

    return {
        queue,
        setQueue,
        isAddSongsModalOpen,
        setIsAddSongModalOpen,
        isClearQueueModalOpen,
        setIsClearQueueModalOpen,
        queueLoading,
        handleAddPlaylistToQueue,
        addPlaylistToQueue,
        handleVoteSong,
        handleMatchedSongUpVote,
        handleClearQueue,
        clearQueue
    }
}