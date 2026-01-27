# 🥚 Professional Egg Boiling Timer

A sophisticated, production-ready egg boiling timer web application built with React, Vite, and Node.js/Express. Perfect your soft, medium, and hard-boiled eggs every time with advanced animations, audio alerts, and detailed statistics.

## ✨ Features

### 🎯 Core Functionality
- **Three Boiling Levels**: Soft (6 min), Medium (10 min), Hard (14 min)
- **Precise Countdown Timer**: Real-time display with seconds precision
- **Visual Boiling Animation**: Animated egg in pot with water, bubbles, and heat waves
- **Audio Alerts**: Multiple alert types for timer completion, milestones, and countdowns

### 🎨 Design & UX
- **Orange Gradient Theme**: Professional, visually appealing interface
- **Framer Motion Animations**: Smooth transitions and interactive elements
- **React Icons**: Beautiful, professional iconography
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Customizable Settings**: Theme, audio volume, and notification preferences

### 📊 Advanced Features
- **Statistics Dashboard**: Track total timers, completion rates, and usage breakdown
- **Browser Notifications**: Get alerted even when the app is in the background
- **Session Persistence**: Save timer history to backend
- **Settings Panel**: Fine-tune audio volume, notifications, and appearance
- **Professional Audio System**: Multiple alert sounds for different events

### 🔧 Backend API
- **Node.js + Express**: Scalable server architecture
- **Timer Sessions**: Track boiling history and completion data
- **Statistics API**: Aggregate usage statistics and analytics
- **Recipe Management**: Store and retrieve boiling recipes
- **CORS Enabled**: Secure cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with AudioContext support

### Installation

1. **Clone or extract the project**
```bash
cd egg
```

2. **Install frontend dependencies**
```bash
cd egg
npm install
```

3. **Install backend dependencies**
```bash
cd ../backend
npm install
```

### Running Locally

**Terminal 1 - Frontend Dev Server**
```bash
cd egg
npm run dev
```
Frontend will run on `http://localhost:5175`

**Terminal 2 - Backend Server**
```bash
cd backend
npm start
```
Backend API will run on `http://localhost:5000`

Both servers run simultaneously. The frontend makes API calls to the backend for statistics and session tracking.

## 📁 Project Structure

```
egg/
├── egg/                    # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── hooks/         # Custom React hooks (useEggTimer)
│   │   ├── utils/         # Utilities (audioAlert system)
│   │   ├── styles/        # Component stylesheets
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
│
└── backend/               # Express backend server
    ├── server.js          # Express app setup
    ├── routes/
    │   ├── timer.js       # Timer session endpoints
    │   ├── recipes.js     # Recipe management endpoints
    │   └── stats.js       # Statistics endpoints
    └── package.json       # Backend dependencies
```

## 🎮 How to Use

1. **Start a Timer**
   - Click on "Soft", "Medium", or "Hard" button to select boiling level
   - Timer begins immediately

2. **Control Timer**
   - **Play/Pause**: Toggle pause to temporarily stop countdown
   - **Reset**: Stop timer and return to level selection

3. **Audio & Notifications**
   - Alerts sound when timer completes
   - Browser notification pops up with egg ready message
   - Enable/disable in Settings

4. **View Statistics**
   - Click the chart icon (📊) in header to toggle statistics dashboard
   - See total timers run, completion rate, and breakdown by level

5. **Settings & Preferences**
   - Click the gear icon (⚙️) to open Settings
   - Adjust audio volume (0-100%)
   - Toggle notifications on/off
   - Choose theme color (Orange, Purple, Pink, Blue)
   - Test sound before saving

## 🔊 Audio System

The application includes an advanced audio notification system with:
- **Completion Alert**: Pleasant C major chord (bell-like sound)
- **Countdown Alert**: Quick beeping sequence for final seconds
- **Milestone Alert**: Ascending notes at 1, 2, and 10 minute marks
- **Pause Alert**: Single tone when pausing

All audio is:
- Non-intrusive and pleasant
- Volume controllable (0-100%)
- Can be individually tested
- Disabled if muted

## 📊 API Endpoints

### Timer Routes (`/api/timer`)
- `POST /save-session` - Save a timer session
  ```json
  {
    "level": "soft|medium|hard",
    "duration": 360,
    "completed": true,
    "startTime": "2024-01-15T10:30:00Z"
  }
  ```
- `GET /history` - Get all saved sessions
- `GET /recent` - Get last 5 sessions
- `DELETE /history` - Clear all sessions

### Stats Routes (`/api/stats`)
- `GET /` - Get all statistics
- `GET /completion-rate` - Get completion percentage
- `POST /update` - Update statistics with new session
  ```json
  {
    "level": "soft|medium|hard",
    "completed": true
  }
  ```
- `POST /reset` - Reset all statistics

### Recipe Routes (`/api/recipes`)
- `GET /` - Get all recipes
- `GET /:id` - Get specific recipe
- `POST /custom` - Add custom recipe
  ```json
  {
    "name": "Custom Egg",
    "time": 480,
    "description": "Custom boiling time"
  }
  ```

## 🛠️ Development

### Building for Production

**Frontend Build**
```bash
cd egg
npm run build
```
Creates optimized build in `egg/dist/` directory.

**Backend Deployment**
```bash
cd backend
npm start
```

### Customizing

**Change Boiling Times**
Edit `useEggTimer.js`:
```javascript
const EGG_LEVELS = {
  soft: { time: 6 * 60, label: 'Soft Boiled' },
  medium: { time: 10 * 60, label: 'Medium Boiled' },
  hard: { time: 14 * 60, label: 'Hard Boiled' }
};
```

**Modify Colors**
Update color variables in `index.css`:
```css
--orange-primary: #FF8C42;
--orange-secondary: #FF6B35;
--orange-accent: #F7931E;
```

**Change Audio Alerts**
Edit `utils/audioAlert.js` to modify frequencies and durations.

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with Web Audio API support

## 🔐 Data Privacy

- All timer data is stored locally in backend session storage
- No external analytics or tracking
- No user data is sent to third parties
- Statistics are aggregated anonymously

## 🚀 Deployment

### Deploy to Vercel (Frontend Only)
```bash
npm install -g vercel
cd egg
vercel
```

### Deploy to Heroku (Backend)
```bash
cd backend
heroku create egg-timer-api
git push heroku main
```

### Deploy to AWS/DigitalOcean
Prepare Docker container:
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Found a bug or have a feature request? Please create an issue or submit a pull request.

## 📧 Support

For questions or feedback, feel free to open an issue on GitHub.

---

**Made with ❤️ for egg enthusiasts everywhere** 🥚
