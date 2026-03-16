const API_PATHS = {
    AUTH:{
        SPOTIFY_LOGIN: "/auth/spotify",
        GET_USER: "/auth/me",
        DELETE_ACCOUNT: "/auth/account",
    },
    
    ROOM: {
        CREATE: "/rooms/create",
        GET_ALL: "/rooms",
        GET_STATE: (roomId) => `/rooms/${roomId}`,
        JOIN: (roomId) => `/rooms/${roomId}/join`,
        LEAVE: (roomId) => `/rooms/${roomId}/leave`,
        DELETE: (roomId) => `/rooms/${roomId}`,
    },

    SPOTIFY: {
        GET_PLAYLISTS: "/spotify/playlists",
        GET_PLAYLIST_ITEMS: (playlistId) => `/spotify/playlists/${playlistId}/items`,
    },

    PLAYER: {
        STATE: (roomId) => `/rooms/${roomId}/player/state`,
        RESUME: (roomId) => `/rooms/${roomId}/player/resume`,
        PAUSE: (roomId) => `/rooms/${roomId}/player/pause`,
        NEXT: (roomId) => `/rooms/${roomId}/player/next`,
        PREVIOUS: (roomId) => `/rooms/${roomId}/player/previous`,
        SEEK: (roomId) => `/rooms/${roomId}/player/seek`,
    },

    QUEUE: {
        UPVOTE_MATCHES: (roomId) => `/rooms/${roomId}/queue/songs/upvote-matches`,
        ADD_PLAYLIST: (roomId) => `/rooms/${roomId}/queue/playlist`,
        CLEAR: (roomId) => `/rooms/${roomId}/queue`,
    },
};

export default API_PATHS;