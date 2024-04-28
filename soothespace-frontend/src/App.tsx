import { useRoute } from 'wouter'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Journal from './pages/Journal'
import Toolbox from './pages/Toolbox'
import Login from './pages/Login'
import Register from './pages/Register'

function App() { // Routing and rendering of pages (parent component to other pages, child to main.tsx)
  const [homeMatch] = useRoute("/")
  const [chatMatch] = useRoute("/chat")
  const [journalMatch] = useRoute("/journal")
  const [toolsMatch] = useRoute("/toolbox")

  // New routes for login and registration
  const [loginMatch] = useRoute("/login")
  const [registerMatch] = useRoute("/register")

  const PAGE = (() => {

    if (homeMatch) return <Home />;
    if (chatMatch) return <Chat />;
    if (journalMatch) return <Journal />;
    if (toolsMatch) return <Toolbox />;
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
      <BottomNav /> {/* Bottom navigation bar, small white outline ontop can be fixed with its own div & its bg color (or position fixed) | Current div's are default white and give outline */}
    </div>
  )
}

export default App
