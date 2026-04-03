import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomState } from '../api/room.api.js';
import toast from 'react-hot-toast';
import { useRoomSubscription } from '../hooks/useRoomSubscription.js';

const RoomPage = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();

  const { isSubscribing } = useRoomSubscription({
    roomId,
    onSuccess: async () => {
      console.log("Subscribed to room updyates successfully");
      const { roomState } = await getRoomState(roomId);
      console.log("Fetched room state:", roomState);
      // Already in room
      setRoom(roomState);
    },
    onError: (error) => {
      console.error("Failed to subscribe to room updates:", error);
      if (error.code === "USER_NOT_FOUND") {
        navigate(`/rooms/${roomId}/join`);
        return;
      }
      if (error.code === "ROOM_NOT_FOUND") {
        toast.error("Room not found");
        navigate('/');
        return;
      }
      toast.error(error.message || "Failed to subscribe to room updates.");
      navigate('/');
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Room: {roomId}</h1>
        {isSubscribing ? <p>Subscribing to room updates...</p> : <p>{room?.roomTitle}</p>}
      </div>
    </div>
  );
};

export default RoomPage;