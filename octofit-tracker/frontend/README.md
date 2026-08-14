# OctoFit Tracker - Frontend (Presentation Tier)

React 19 + Vite presentation layer for the OctoFit Tracker multi-tier application.

## 🏗️ Architecture

**Tech Stack:**
- React 19 with Vite for fast development and optimized builds
- React Router DOM for client-side navigation
- Bootstrap for responsive styling
- Custom `useAPI` hook for centralized API communication

**Ports:**
- Development: `http://localhost:5173`
- Codespaces: `https://{CODESPACE_NAME}-5173.app.github.dev`

## 🔧 Environment Setup

### Required: Set VITE_CODESPACE_NAME

Create `.env.local` in the frontend directory:

```bash
# .env.local
VITE_CODESPACE_NAME=your-codespace-name-here
```

**To find your Codespace name:**
1. Look at the browser URL when in your Codespace
2. Extract the part before `-5173.app.github.dev`
3. Example: `supreme-memory-759rwv6qj6vfw5xq-5173.app.github.dev`
   → `VITE_CODESPACE_NAME=supreme-memory-759rwv6qj6vfw5xq`

### Optional: Custom API Base URL

For local development (default fallback):

```bash
# .env.local
VITE_API_BASE_URL=http://localhost:8000
```

## 📁 Project Structure

```
src/
├── pages/              # Main page components
│   ├── Dashboard.jsx   # Overview and statistics
│   ├── Users.jsx       # User profiles
│   ├── Teams.jsx       # Team management
│   ├── Activities.jsx  # Activity log
│   ├── Leaderboard.jsx # Team rankings
│   └── Workouts.jsx    # Workout plans
├── components/         # Reusable components
│   └── Navigation.jsx  # Top navigation bar
├── hooks/              # Custom React hooks
│   └── useAPI.js       # API fetching with auto URL detection
├── App.jsx             # Root component with routing
└── main.jsx            # Vite entry point
```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts dev server with HMR at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Creates optimized build in `dist/` directory

### Preview Production Build
```bash
npm run preview
```

## 🔌 API Integration

### useAPI Hook

The custom `useAPI` hook handles API requests with automatic URL detection:

```javascript
import { useAPI } from '../hooks/useAPI';

function MyComponent() {
  const { data, loading, error } = useAPI('/api/users');
  // Returns array of users from the backend
}
```

**Features:**
- Automatically detects Codespaces vs localhost environment
- Uses `VITE_CODESPACE_NAME` environment variable
- Handles both array and paginated responses
- Provides loading and error states

### API Endpoints

All endpoints use this base URL pattern:
- **Codespaces:** `https://{VITE_CODESPACE_NAME}-8000.app.github.dev`
- **Local:** `http://localhost:8000`

Available endpoints:
- `GET /api/users` - List all users
- `GET /api/teams` - List all teams
- `GET /api/activities` - List all activities
- `GET /api/leaderboard` - Get leaderboard rankings
- `GET /api/workouts` - List all workouts

## 🛣️ Routing

**Routes:**
- `/` - Dashboard (overview)
- `/users` - Users page
- `/teams` - Teams page
- `/activities` - Activities page
- `/leaderboard` - Leaderboard page
- `/workouts` - Workouts page

Navigation links use React Router with active state highlighting.

## 🎨 Styling

- Bootstrap 5 for responsive grid and components
- Custom CSS in `src/App.css` and `src/index.css`
- Dark theme navigation with colored stat cards
- Shadow effects and hover states for better UX

## 📝 Components Documentation

### Page Components
Each page component:
- Fetches data via `useAPI` hook
- Shows loading spinner while fetching
- Displays error alert if request fails
- Renders empty state if no data
- Includes emoji icons for visual appeal

### Navigation Component
- Sticky navbar with brand logo
- Active route highlighting
- Responsive mobile menu (Bootstrap collapse)
- Links to all 6 main pages

## 🐛 Troubleshooting

### "undefined-8000" in API URL
**Solution:** Set `VITE_CODESPACE_NAME` in `.env.local`

### CORS Errors
**Solution:** Ensure backend is running and has CORS enabled

### Components show "No data found"
**Solution:** 
1. Verify backend is running on port 8000
2. Check MongoDB is connected
3. Run backend seed script to populate data
4. Check browser console for API errors

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [React Router Documentation](https://reactrouter.com)
- [Bootstrap Documentation](https://getbootstrap.com/docs)

## 🔄 Development Workflow

1. **Make changes** to React components
2. **Vite HMR** automatically refreshes the page
3. **Test API integration** - verify data loads from backend
4. **Build and test** with `npm run build && npm run preview`
5. **Deploy** to Codespaces or production environment

---

**Part of:** OctoFit Tracker Multi-tier Application
- Backend: Node.js/Express on port 8000
- Database: MongoDB on port 27017

