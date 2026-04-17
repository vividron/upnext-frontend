# 🎧 UpNext

UpNext is a real-time social music voting app where people in a room can match their playlists with the queue and collaboratively upvote or downvote songs, shaping the queue and creating a more fair and interactive listening experience.

- Live App: https://upnext-music.vercel.app/
- Backend Repository: https://github.com/vividron/upnext-api

## 🎥 Demo
[upnext (1).webm](https://github.com/user-attachments/assets/f3e13c88-218f-46b4-b667-c2ea3ce9c9d1)


## 🖥️ Desktop View

<img width="1913" height="1009" alt="Screenshot 2026-04-12 213158" src="https://github.com/user-attachments/assets/75ae92fe-5a53-4f6b-a3ea-3364b028ed09" />
<img width="1919" height="1013" alt="Screenshot 2026-04-12 212641" src="https://github.com/user-attachments/assets/e9114127-b44c-43f3-ba29-90719ab45c39" />
<img width="1919" height="1013" alt="Screenshot 2026-04-12 212700" src="https://github.com/user-attachments/assets/0478b4bd-c43e-47c1-8bdb-0442062331e9" />
<img width="1919" height="1014" alt="Screenshot 2026-04-12 203834" src="https://github.com/user-attachments/assets/2b34588a-c81c-4dc0-ab25-abb81ab68c67" />


## 📱 Mobile View
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/52bda84b-a75b-4783-b633-e7d08adccbde" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/1e321410-0045-4fbf-aab0-11a1786a3e89" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/40fb6d9c-978f-438c-8f85-0dd8fdcdcdc6" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/2c1eab6b-08e6-469a-bebf-cd6e9fd89e8e" width="250"/></td>
  </tr>
</table>

## 🚀 Overview

- A **host** creates a room and adds songs to a queue
- users in the room can either match their playlist or upvote/downvote songs they like.

The queue dynamically updates in **real-time**, ensuring the most popular songs rise to the top.

In the match playlist flow, users upload their own playlist, and songs that match the room queue's vibe get automatically upvoted, making voting even easier.

Think of it like a democratic playlist for real-world spaces.

---

## 🔥 Key Features

### 🎵 Live Song Voting

- Upvote / downvote songs in the queue  
- Queue reorders instantly based on votes  
- Fair and community-driven playback  

### 👥 Room-Based System

- Hosts create rooms  
- Users join and interact within the same session  

### 🔗 Playlist Matching

- Upload your playlist  
- Matching songs in the queue are **automatically upvoted**  
- No need to manually scroll and vote  

### ⚡ Real-Time Sync

- Powered by WebSockets  
- Instant updates for:
  - Song changes  
  - Votes  
  - Queue updates  
  - Player state  

### 📡 Smart Presence System

- Detects inactive or disconnected users  
- Grace period (~10s) before removing users  
- If host leaves → room automatically ends  

### 🎧 Spotify Integration

- Playback happens on **host’s Spotify device**  
- App acts as a **remote controller**  

### 🔄 Player State Sync

- Handles:
  - Manual changes from Spotify app  
  - Device switching  
  - Playback errors  
- Displays sync issues clearly in UI  

### 🧠 Virtual Queue System

- No real queue is created on Spotify  
- App controls playback dynamically using a **virtual queue**  

---
### 🖥️ Tech Stack

- ⚛️ **Framework**: React (component-driven architecture)
- 🎨 **Styling**: Tailwind CSS (utility-first styling)
- 🎞️ **Animations**: Framer Motion (smooth UI transitions & micro-interactions)
- 🔌 **Realtime Communication**: Socket.IO Client (live voting & sync updates)
- 🧠 **State Management**: React Context + custom hooks
- 🌐 **API Handling**: Axios / Fetch for REST communication
- 🔐 **Authentication Flow**: Spotify OAuth (handled via backend, consumed on frontend)

### 🔗 Backend Repository

👉 [UpNext Backend](https://github.com/vividron/upnext-api)

Handles:
- Http and WebSocket server (Socket.IO)
- Voting logic & concurrency control
- Redis-based real-time state & presence system
- Spotify API integration

### 🧩 Frontend Responsibilities

- Real-time UI updates for voting & queue changes
- Socket event handling and state synchronization
- Optimistic UI updates for better user experience
- Handling edge cases (disconnects, sync mismatch, stale state)
- Visualizing player state from external Spotify source

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/upnext-frontend.git
   cd upnext-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
- Create a .env file in the root directory of the project and add the following variables:
    ```
    VITE_API_BASE_URL=http://127.0.0.1:8000/api  // Base URL for all REST API requests
    VITE_WS_URL=http://127.0.0.1:8000  // WebSocket server URL
    ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

---

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Page components
├── context/            # React context for state management
├── hooks/              # Custom React hooks
├── api/                # API calls and configurations
├── sockets/            # WebSocket client setup
├── animations/         # Animation utilities
└── main.jsx            # App entry point
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them.
4. Submit a pull request with a clear description of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
