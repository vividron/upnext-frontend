import { useNavigate, useParams } from 'react-router-dom';
import { getRoomState } from '../api/room.api.js';
import toast from 'react-hot-toast';
import { useRoomSubscription } from '../hooks/useRoomSubscription.js';
import { useRoom } from '../hooks/useRoom.js';
import { usePlayer } from '../hooks/usePlayer.js';
import { useQueue } from '../hooks/useQueue.js';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react'
import { Share2, LogOut, Users, Speaker, CircleAlert, ListPlus, CircleEqual, ArrowDown, ArrowUp } from "lucide-react";
import SpotifyLoader from '../components/SpotifyLoader.jsx';
import SpotifyButton from '../components/SpotifyButton.jsx';
import clsx from 'clsx';
import Player from '../components/Player.jsx';
import SongCard from '../components/SongCard.jsx';
import SongsDialog from '../components/SongsDialog.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';

const RoomPage = () => {
  const { roomId } = useParams();
  const [isHost, setIsHost] = useState(false);
  const navigate = useNavigate();

  const {
    room,
    setRoom,
    isLeaving,
    isLeaveRoomModalOpen,
    setIsLeaveRoomModalOpen,
    handleLeaveRoom,
  } = useRoom(roomId, { isHost });

  const {
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
  } = useQueue(roomId, { isHost });

  const {
    playerState,
    setPlayerState,
    syncError,
    playbackLoading,
    handlePlay,
    handlePause,
    handlePlayNext,
  } = usePlayer(roomId, { isHost, queue, setQueue });

  const { isSubscribing } = useRoomSubscription({
    roomId,
    onSuccess: async () => {

      const { roomState } = await getRoomState(roomId);

      // Update states
      setRoom({ title: roomState.roomTitle, memberCount: roomState.memberCount });
      setIsHost(roomState?.isHost ?? false);
      setPlayerState(roomState.playerState);

      let queueSongs = roomState.queue;

      // Add user votes
      if (!roomState.isHost && roomState.userVotes) {
        const voteMap = new Map(
          roomState.userVotes.map(v => [v.songId, v.vote])
        );

        queueSongs = roomState.queue.map(song => ({
          ...song,
          vote: voteMap.get(song.songId) ?? 0
        }));
      }
      setQueue(queueSongs);

    },
    onError: (error) => {
      if (error.code === "USER_NOT_FOUND") {
        navigate(`/rooms/${roomId}/join`);
        return;
      }
      if (error.code === "ROOM_NOT_FOUND") {
        toast.error("Room not found");
        navigate('/');
        return;
      }
      toast.error("Failed to subscribe to room updates.");
      navigate('/');
    }
  });

  const handleShare = async () => {
    try {
      const joinUrl = `${window.location.origin}/rooms/${roomId}/join`;

      await navigator.clipboard.writeText(joinUrl);

      toast.success("Invite link copied!");
    } catch (err) {
      toast.error("Failed to copy Invite link");
    }
  };

  if (isSubscribing) {
    return <div className="h-screen container mx-auto px-4 py-8 flex items-center justify-center">
      <SpotifyLoader />
    </div>
  }

  return (
    <div className="min-h-screen bg-surface text-main px-4 pt-4 pb-5 select-none">
      {/* Header */}
      <header className="flex justify-between items-start gap-6 mb-6">
        <div className="space-y-1 min-w-0 flex-1">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight truncate">
            {room?.title}
          </h1>

          <div className="flex items-center gap-1.5">
            <span className="size-1.5 md:size-2 mb-0.5 rounded-full bg-green-400" />
            <span className="text-main text-[0.7rem] md:text-sm font-semibold uppercase">
              Live Session
            </span>
          </div>
        </div>

        {/*Leave room/end session */}
        <SpotifyButton
          onClick={() => setIsLeaveRoomModalOpen(true)}
          className='bg-red-700 hover:bg-red-800 backdrop-blur-xl text-main border border-white/10 rounded-full font-semibold ml-4 text-xs! md:text-sm! py-2.5! px-5! hover:bg-surface-container-hover'>
          <div className="flex gap-2 items-center">
            <LogOut className={clsx("size-3.5 md:size-4",
              isHost ? "md:hidden" : "block"
            )} />
            <span className='text-[0.6rem] hidden md:text-sm md:block'>{isHost ? "End Session" : "Leave Room"}</span>
          </div>
        </SpotifyButton>
      </header>

      {/*main content */}
      <div className='max-w-4xl mx-auto '>
        <div className="bg-surface-container rounded-2xl px-4 pt-4 pb-5 sm:p-5 mb-6 shadow-lg space-y-4">
          {/* Room info */}
          <div className="flex justify-between items-center">
            <div className='flex items-center text-main gap-1.5 px-3 py-1 md:px-4 md:py-2 rounded-full bg-surface-highest'>
              <Users className='size-3 md:size-4' />
              <span className='text-xs md:text-sm mt-px'>{room?.memberCount ?? 0}</span>
            </div>
            <div className="flex gap-5 items-center">
              {isHost && (
                <div className='flex items-center text-black font-bold gap-1 px-3 py-1 md:px-3.5 md:py-1.5 rounded-full bg-green-600'>
                  <Speaker className='size-3 md:size-4' strokeWidth={2.5} />
                  <span className='text-xs md:text-sm mt-px'>{playerState?.device?.name ?? "No Active Devices"}</span>
                </div>
              )}
              <button onClick={handleShare}>
                <Share2 className='size-4 md:size-5 text-sub hover:text-(--text-primary) active:scale-90 active:text-(--text-primary) cursor-pointer' />
              </button>
            </div>
          </div>

          {/* Player*/}
          <Player
            isHost={isHost}
            playerState={playerState}
            playerLoading={playbackLoading}
            controls={{ handlePlay, handlePause, handlePlayNext }}
          />

          {syncError && <div className='flex gap-1 sm:gap-1.5 items-center text-[0.6rem] sm:text-xs text-red-400 min-w-0'>
            <CircleAlert className='size-2.5 sm:size-3.5 mb-px' />
            <p className='truncate'>{syncError}</p></div>}
        </div>

        {/* Queue action buttons*/}
        <div className="mb-4">
          {isHost ?
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setIsAddSongOpen(true)}
                className="flex items-center gap-2 ml-4 text-xs sm:text-sm text-sub font-semibold hover:text-(--text-primary) active:text-(--text-primary) hover:scale-[1.03] active:scale-[0.97] transition duration-200 ease-in-out cursor-pointer">
                <ListPlus className='size-5' strokeWidth={2.5} />
                <span>Add Songs</span>
              </button>

              <button
                onClick={() => setIsClearQueueModalOpen(true)}
                className="text-xs sm:text-sm text-sub font-semibold mr-4 hover:text-(--text-primary) active:text-(--text-primary) hover:scale-[1.03] active:scale-[0.97] transition duration-200 ease-in-out cursor-pointer">
                Clear Queue
              </button>
            </div> : <button
              onClick={() => setIsSelectPlaylistOpen(true)}
              className="flex items-center gap-2 ml-4 text-xs sm:text-sm text-sub font-semibold hover:text-(--text-primary) active:text-(--text-primary) hover:scale-[1.03] active:scale-[0.97] transition duration-200 ease-in-out cursor-pointer">
              <CircleEqual className='size-5' strokeWidth={2.5} />
              <span>Match Playlist</span>
            </button>}
        </div>

        {/* Queue */}
        <div className="bg-surface-container rounded-2xl h-screen py-4 pl-4 pr-2">
          <AnimatePresence>
            {queue.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-main mb-1">Queue is empty</h2>
                <p className="text-xs md:text-sm text-sub mb-3">Add songs to the queue</p>

                <SpotifyButton
                  onClick={() => setIsAddSongOpen(true)}
                  className="bg-[rgba(31,31,31,0.7)]! backdrop-blur-xl text-main border border-white/10 rounded-full font-semibold text-xs! md:text-sm! hover:bg-surface-container-hover">
                  <div className="flex gap-2 items-center">
                    <ListPlus className="size-4 md:size-4.5" />
                    <span>Add Songs</span>
                  </div>
                </SpotifyButton>
              </div>
            ) : (
              <ul className='flex flex-col h-full overflow-y-auto gap-2'>

                {queue.map((song) => (
                  <motion.li
                    key={song?.songId}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    exit={{ opacity: 0 }}
                  >
                    <SongCard
                      coverImage={song?.coverImage}
                      name={song?.name ?? "Song not found"}
                      artistNames={song?.artists}
                      className="overflow-hidden mr-2"
                    >
                      {/*Vote button */}
                      <div className="flex items-center rounded-full
                           bg-black/20 text-main p-px border border-white/10 shrink-0">

                        <button
                          disabled={!song?.songId}
                          onClick={() => { handleVoteSong(song.songId, 1) }}
                          className={clsx(" p-2 sm:p-2.5 rounded-full cursor-pointer transition",
                            song?.vote === 1 ? "text-primary cursor-not-allowed" : "text-main hover:bg-surface-highest active:bg-surface-high")}
                        >
                          <ArrowUp className='size-3.5 sm:size-4' />

                        </button>

                        <span className='text-xs sm:text-sm px-1.5 tabular-nums'>{song?.score && song?.score > 0 ? song.score : 0}</span>

                        <button
                          disabled={!song?.songId}
                          onClick={() => { if (song?.songId) handleVoteSong(song.songId, -1) }}
                          className={clsx(" p-2 sm:p-2.5 rounded-full cursor-pointer transition",
                            song?.vote === -1 ? "text-primary cursor-not-allowed" : "text-main hover:bg-surface-highest active:bg-surface-high")}
                        >
                          <ArrowDown className='size-3.5 sm:size-4' />
                        </button>
                      </div>
                    </SongCard>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </div>
      </div>
      <SongsDialog
        isOpen={isAddSongOpen}
        onClose={() => setIsAddSongOpen(false)}
        heading="Add Playlist to Queue"
        actionButtonName="Add"
        onActionButtonClick={handleAddPlaylistToQueue}
        processingPlaylistId={queueLoading.addingPlaylist.playlistId}
        isProcessing={queueLoading.addingPlaylist.adding}
      />

      <SongsDialog
        isOpen={isSelectPlaylistOpen}
        onClose={() => setIsSelectPlaylistOpen(false)}
        heading="Compare Playlist with Queue"
        subHeading="Matching songs will be automatically upvoted"
        actionButtonName="Compare"
        onActionButtonClick={handleMatchedSongUpVote}
        processingPlaylistId={queueLoading.upvotingMatchedSong.playlistId}
        isProcessing={queueLoading.upvotingMatchedSong.upvoting}
      />

      <ConfirmationModal
        isOpen={isLeaveRoomModalOpen}
        onClose={() => setIsLeaveRoomModalOpen(false)}
        onConfirm={handleLeaveRoom}
        isLoading={isLeaving}
        title="Leave Room?"
        description={`Are you sure you want to leave "${room?.title ?? roomId}"?`}
      />

      <ConfirmationModal
        isOpen={isClearQueueModalOpen}
        onClose={() => setIsClearQueueModalOpen(false)}
        onConfirm={handleClearQueue}
        isLoading={queueLoading.clearingQueue}
        title="Clear Queue?"
        description="Are you sure you want to clear the queue? This action cannot be undone."
      />
    </div>
  );
};

export default RoomPage;