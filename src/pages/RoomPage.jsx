import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    // TODO: Fetch room data and queue
    console.log('Loading room:', roomId);
  }, [roomId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Room: {roomId}</h1>
        <p className="text-gray-600">Collaborative music queue</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Track */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Now Playing</h2>
            {currentTrack ? (
              <div className="flex items-center space-x-4">
                <img
                  src={currentTrack.albumArt}
                  alt={currentTrack.title}
                  className="w-16 h-16 rounded"
                />
                <div>
                  <h3 className="font-medium">{currentTrack.title}</h3>
                  <p className="text-gray-600">{currentTrack.artist}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No track currently playing</p>
            )}
          </div>

          {/* Player Controls */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Player Controls</h2>
            <div className="flex justify-center space-x-4">
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                Previous
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded">
                Play/Pause
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Queue */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Queue</h2>
          {queue.length > 0 ? (
            <div className="space-y-3">
              {queue.map((track, index) => (
                <div key={track.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                  <span className="text-gray-500 w-6">{index + 1}</span>
                  <img
                    src={track.albumArt}
                    alt={track.title}
                    className="w-10 h-10 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{track.title}</p>
                    <p className="text-gray-600 text-sm truncate">{track.artist}</p>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Queue is empty</p>
          )}

          {/* Add Song Button */}
          <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
            Add Song
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;