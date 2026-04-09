import { useEffect, useState } from "react";
import { emitEvent, isSocketConnected, listenEvent, listenEventOnce, removeListener } from "../sockets/socket.js";
import { EVENTS } from "../sockets/socket.events.js";
import * as queueService from "../api/queue.api.js";
import toast from "react-hot-toast";
import { getPlaylistItems } from "../api/spotify.api.js";

export const useQueue = (roomId, { isHost }) => {
    const [queue, setQueue] = useState([]);
    const [isAddSongOpen, setIsAddSongOpen] = useState(false);
    const [isSelectPlaylistOpen, setIsSelectPlaylistOpen] = useState(false);
    const [isClearQueueModalOpen, setIsClearQueueModalOpen] = useState(false);

    const [queueLoading, setQueueLoading] = useState({
        addingPlaylist: { playlistId: null, adding: false },
        upvotingMatchedSong: { playlistId: null, upvoting: false },
        votingSong: false,
        clearingQueue: false,
    });

    const fetchPlaylistItems = async (playlistId) => {
        const { items } = await getPlaylistItems(playlistId, 50);
        if (!items && items?.length === 0) return;
        return items
    }

    const handleAddPlaylistToQueue = async (playlistId) => {
        try {
            if (!isHost) {
                return toast.error("Only the room host can add songs");
            }
            setQueueLoading(prev => ({ ...prev, addingPlaylist: { playlistId, adding: true } }));

            const songs = await fetchPlaylistItems(playlistId);
            await queueService.addPlaylistToQueue(roomId, songs);
            setIsAddSongOpen(false);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setQueueLoading(prev => ({ ...prev, addingPlaylist: { playlistId, adding: false } }));
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

    const getMatchedSongsMessage = (count) => {
        if (count === 1) return "1 matching song found. Upvoting it now.";
        return `${count} matching songs found. Upvoting them now.`;
    };

    const handleMatchedSongUpVote = async (playlistId) => {
        try {
            if (isHost) {
                return toast.error("Host cannot match songs")
            }
            // check if queue is empty
            if (queue.length === 0) {
                toast.error("Queue is empty");
                return;
            }

            setQueueLoading(prev => ({ ...prev, upvotingMatchedSong: { playlistId, upvoting: true } }));

            const userSongs = await fetchPlaylistItems(playlistId);

            // Find songs in the queue that match the user’s songs
            // Create a Set of user song IDs
            const userSongIds = new Set(userSongs.map(song => song.songId));
            // Filter matching songs from queue
            const matchedSongIds = queue
                .filter(song => userSongIds.has(song.songId))
                .map((song) => song.songId);

             if(matchedSongIds.length === 0) {
                toast("No matching songs found in the queue.");
                return
             }
            await queueService.upvoteMatchedSongs(roomId, matchedSongIds);
            setIsSelectPlaylistOpen(false);
            toast(getMatchedSongsMessage(matchedSongIds.length));

        } catch (error) {
            toast.error(error.message);
        } finally {
            setQueueLoading(prev => ({ ...prev, upvotingMatchedSong: { playlistId, upvoting: false } }));
        }
    }

    const handleClearQueue = async () => {
        try {
            setQueueLoading(prev => ({ ...prev, clearingQueue: true }));
            await queueService.clearQueue(roomId);
            setIsClearQueueModalOpen(false);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setQueueLoading(prev => ({ ...prev, clearingQueue: false }));

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
                .map(song => scoreMap.has(song.songId) ? { ...song, score: scoreMap.get(song.songId), vote: 1 } : song)
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
        isAddSongOpen,
        setIsAddSongOpen,
        isSelectPlaylistOpen,
        setIsSelectPlaylistOpen,
        isClearQueueModalOpen,
        setIsClearQueueModalOpen,
        queueLoading,
        handleAddPlaylistToQueue,
        handleVoteSong,
        handleMatchedSongUpVote,
        handleClearQueue
    }
}