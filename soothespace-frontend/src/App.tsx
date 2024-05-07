import { useRoute } from 'wouter'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Journal from './pages/Journal'
import Meditation from './pages/Meditation'
import Mood from './pages/Mood'
import Login from './pages/Login'
import Register from './pages/Register'
import { useLogin } from './hooks/useLogin'

function App() { // Routing and rendering of pages (parent component to other pages, child to main.tsx)
  const [homeMatch] = useRoute("/")
  const [chatMatch] = useRoute("/chat")
  const [journalMatch] = useRoute("/journal")
  const [moodMatch] = useRoute("/mood")
  const [meditationMatch] = useRoute("/meditation")

  // New routes for login and registration
  const [loginMatch] = useRoute("/login")
  const [registerMatch] = useRoute("/register")

  const { isLoggedin } = useLogin()
  
  const PAGE = (() => {
    if (!isLoggedin && !(registerMatch || loginMatch)) {
      return <Login />
    }
    if (homeMatch) return <Home />;
    if (chatMatch) return <Chat />;
    if (journalMatch) return <Journal />;
    if (meditationMatch) return <Meditation />;
    if (moodMatch) return <Mood />;
    if (loginMatch) return <Login />; // Route for Login
    if (registerMatch) return <Register />; // Route for Register

    return (
      <div>
        404 That page does not exist
      </div>
    )
  })()

  return (
    <div className='w-screen h-screen flex flex-col  ' >
      <div className='flex-1 '>
        {PAGE}
      </div>

      <div className='fixed bottom-0'>
        <BottomNav />
        {/* Bottom navigation bar, small white outline ontop can be fixed with its own div & its bg color (or position fixed) | Current div's are default white and give outline */}
      </div>
    </div>
  )
}

export default App;