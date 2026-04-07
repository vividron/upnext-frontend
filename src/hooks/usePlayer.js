import { useEffect, useRef, useState } from "react";
import { isSocketConnected, listenEvent, listenEventOnce, removeListener } from "../sockets/socket.js";
import { EVENTS } from "../sockets/socket.events.js";
import toast from "react-hot-toast";
import { getPlayBackState, pausePlayer, resumePlayer, playNext } from "../api/player.api.js";
import { useNavigate } from "react-router-dom";

export const usePlayer = (roomId, { isHost, queue, setQueue }) => {
    const [playerState, setPlayerState] = useState(null);
    const [syncError, setSyncError] = useState(null);
    const navigate = useNavigate();

    const isHostRef = useRef(isHost);
    const queueRef = useRef(queue);
    const playerRef = useRef(playerState);
    const progressIntervalRef = useRef(null);
    const isMountedRef = useRef(true);
    const playbackStatePollingRef = useRef(null);
    const isTransitioningRef = useRef(false);

    // changing player status (play/pause) or play next song.
    const [playbackLoading, setPlaybackLoading] = useState({
        updating: false,
        playing: false,
        pausing: false,
        playingNext: false
    });

    const canPerformPlayerAction = ({ isStateSync = false } = {}) => {
        if (!isHostRef.current) {
            toast.error("Only the host can perform this action");
            return false
        } else if (!playerRef.current?.device?.id && !isStateSync) {
            toast.error("No active device. Open Spotify on any of your devices to start playing the queue.", { duration: 5000 });
            return false;
        }
        return true;
    };

    const handlePlay = async () => {
        try {
            if (!canPerformPlayerAction()) return;
            if (playerRef.current?.isPlaying) return;
            setPlaybackLoading(prev => ({ ...prev, updating: true, playing: true }));

            // handle initial state
            if (!playerRef.current?.song?.songId) {
                // handle state when songs just added to queue
                if (queueRef.current?.length !== 0) {
                    await playNext(roomId);
                    return;
                }
                return toast.error("Add songs to queue to start playing.")
            }

            await resumePlayer(roomId);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPlaybackLoading(prev => ({ ...prev, updating: false, playing: false }));
        }
    }

    const handlePause = async ({ isStateSync = false } = {}) => {
        try {
            if (!canPerformPlayerAction({ isStateSync })) return;
            if (!playerRef.current?.isPlaying) return
            setPlaybackLoading(prev => ({ ...prev, updating: true, pausing: true }));

            await pausePlayer(roomId, isStateSync);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPlaybackLoading(prev => ({ ...prev, updating: false, pausing: false }));
        }
    };

    const handlePlayNext = async () => {
        try {
            if (!canPerformPlayerAction()) return;
            setPlaybackLoading(prev => ({ ...prev, updating: true, playingNext: true }));

            await playNext(roomId);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPlaybackLoading(prev => ({ ...prev, updating: false, playingNext: false }));
        }
    }

    // progress timer logic
    const startProgressTimer = () => {
        if (progressIntervalRef.current) return;

        progressIntervalRef.current = setInterval(() => {

            // if song ended and player playing next don't update the progress
            if(isTransitioningRef.current) return;

            const player = playerRef.current;
            if (!player || !player.song) return;

            const now = Date.now();

            const currentPosition = player.position + (player.startedAt ? now - player.startedAt : 0);
            const duration = player.song.duration ?? 0;

            const isEnding = duration - currentPosition <= 1500;
            if (isEnding) {
                isTransitioningRef.current = true;

                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;

                setPlayerState(prev => ({
                    ...prev,
                    position: duration,
                    startedAt: null
                }));

                if (isHostRef.current) {
                    handlePlayNext();
                }
                return;
            }

            setPlayerState(prev => ({
                ...prev,
                position: currentPosition,
                startedAt: now,
            }));
        }, 1000);
    };

    const validatePlayerSync = async (devicePlaybackState, appPlaybackState) => {
        if (devicePlaybackState && appPlaybackState && !appPlaybackState?.isPlaying && playbackLoading.updating) return;

        // No device found error
        if (!devicePlaybackState?.device) {
            setSyncError("Player sync failed. No active device to play song.");
            await handlePause({ isStateSync: true });
            return;
        }

        // compare apps playback state with host device playback state.
        // verify if the song in our app is same as host device's current song.
        const currentlyPlayingSongId = devicePlaybackState?.currentSongId;
        if (currentlyPlayingSongId !== appPlaybackState?.song?.songId) {
            setSyncError("Player sync failed. Current track is different from device's track.");
            await handlePause({ isStateSync: true });
            return;
        }

        // check play or pause mismatch
        const isPlaying = devicePlaybackState?.isPlaying;
        if (isPlaying !== null && isPlaying !== appPlaybackState?.isPlaying) {
            setSyncError("Player sync failed. Playback status is different from device's status.");
            await handlePause({ isStateSync: true });
            return;
        }
        // Todo - check progress bar error 
        // let appProgress;
        // let hostDeviceProgress;
        // if (devicePlaybackState?.isPlaying) {
        //     appProgress = appPlaybackState.position + (appPlaybackState.startedAt ? Date.now() - appPlaybackState.startedAt : 0);
        //     hostDeviceProgress = devicePlaybackState?.progress + (devicePlaybackState?.startedAt ? (Date.now() - devicePlaybackState.startedAt) : 0);
        // }
        // else {
        //     appProgress = appPlaybackState?.position;
        //     hostDeviceProgress = devicePlaybackState?.progress ?? 0;
        // }

        // const progressDiff = Math.abs(appProgress - hostDeviceProgress);
        // if (progressDiff > 5000) { // if progress difference is more than 5 seconds, show sync error
        //     setSyncError(Player sync failed. Progress of the current track is different from device's progress.);
        //     return;
        // }
    }

    //host device playback polling
    useEffect(() => {
        isHostRef.current = isHost;

        isMountedRef.current = true;
        if (isHostRef.current && !playbackStatePollingRef.current) {
            const startListeningPlayerState = async () => {
                if (!isMountedRef.current) return;

                try {
                    const { playbackState } = await getPlayBackState(roomId);

                    if (!isMountedRef.current) return;

                    // validate player state
                    if (progressIntervalRef.current && !isTransitioningRef.current) {
                        await validatePlayerSync(playbackState, playerRef.current);
                    }
                    // set the device on which the song is playing from all the available devises
                    const hasPlayerDevice = playbackState?.devices?.some((d) => d?.id === playbackState?.device?.id)
                    const device = hasPlayerDevice ? playbackState.device : playbackState?.devices?.[0];

                    setPlayerState(prev => ({ ...prev, device: device ?? null }));
                } catch (error) {
                    if (!isMountedRef.current) return;
                    toast.error("Failed to get current playback state");
                    navigate("/");
                }
                if (!isMountedRef.current) return;
                playbackStatePollingRef.current = setTimeout(startListeningPlayerState, 5000);
            }
            startListeningPlayerState();
        }
        return () => {
            isMountedRef.current = false;

            clearTimeout(playbackStatePollingRef.current);
            playbackStatePollingRef.current = null;
        };
    }, [isHost, roomId]);

    // update queue ref
    useEffect(() => {
        queueRef.current = queue;
    }, [queue, roomId]);

    // update player ref
    useEffect(() => {
        playerRef.current = playerState;

        if (!playerRef.current) return;

        // If already playing but no timer start it
        if (playerRef.current.isPlaying && !progressIntervalRef.current) {
            startProgressTimer();
        }

        // If paused ensure timer is stopped
        if (!playerRef.current.isPlaying && progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }

    }, [playerState, roomId]);

    // Player socket event listeners
    useEffect(() => {

        // Start / Resume playback
        const play = () => {
            if (playerRef.current?.isPlaying) return;

            setPlayerState(prev => ({ ...prev, isPlaying: true, startedAt: Date.now() }));

            startProgressTimer();
        };

        // Pause playback
        const pause = () => {
            if (!playerRef.current?.isPlaying) return;

            setPlayerState(prev => ({
                ...prev,
                isPlaying: false,
                startedAt: null,
                position: prev.position + (prev.startedAt ? Date.now() - prev.startedAt : 0)
            }));

            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        };

        // Play next song in the queue
        const next = (nextSong) => {
            if (!nextSong) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
                isTransitioningRef.current = false;

                setPlayerState({
                    song: null,
                    position: 0,
                    startedAt: null,
                    isPlaying: false,
                });
                return;
            }

            // remove the top song from queue and set it as current song
            const currSong = nextSong;
            setQueue(prev => prev.slice(1));

            setPlayerState(prev => ({
                ...prev,
                isPlaying: true,
                position: 0,
                startedAt: Date.now(),
                song: currSong,
            }));
            isTransitioningRef.current = false;
            startProgressTimer();
        }

        const handlePlayerNext = (data) => {
            const nextSongId = data?.songId;
            // if next song id is null, it means queue is empty and player should be stopped.
            if (!nextSongId) {
                // if queue is not empty, it means there is a mismatch. refresh room to sync with host's player state
                if (queueRef.current.length !== 0) {
                    window.location.href = `/rooms/${roomId}`;
                    return;
                }
                next(null);
                return;
            }
            // 
            if (nextSongId !== queueRef.current[0]?.songId) {
                // refresh room to sync with host's player state
                window.location.href = `/rooms/${roomId}`;
                return;
            }
            next(queueRef.current[0]);
        }

        const handlePlayerPause = () => {
            pause();
        }

        const handlePlayerResume = () => {
            play();
        }

        const listenPlayerEvents = () => {
            listenEvent(EVENTS.PLAYER_NEXT, handlePlayerNext);
            listenEvent(EVENTS.PLAYER_PAUSE, handlePlayerPause);
            listenEvent(EVENTS.PLAYER_RESUME, handlePlayerResume);
        };

        if (isSocketConnected()) {
            listenPlayerEvents();
        } else {
            listenEventOnce("connect", listenPlayerEvents);
        }

        return () => {
            removeListener("connect", listenPlayerEvents);
            removeListener(EVENTS.PLAYER_NEXT, handlePlayerNext);
            removeListener(EVENTS.PLAYER_PAUSE, handlePlayerPause);
            removeListener(EVENTS.PLAYER_RESUME, handlePlayerResume);
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        };
    }, [roomId]);

    return {
        playerState,
        setPlayerState,
        syncError,
        playbackLoading,
        handlePlay,
        handlePause,
        handlePlayNext,
    };
};