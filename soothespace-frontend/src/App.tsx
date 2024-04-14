
import { useRoute } from 'wouter'
import './App.css'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Journal from './pages/Journal'
import Tools from './pages/Tools'

function App() {
  const [homeMatch] = useRoute("/")
  const [chatMatch] = useRoute("/chat")
  const [journalMatch] = useRoute("/journal")
  const [toolsMatch] = useRoute("/tools")

  const PAGE = (() => {

    if (homeMatch) {
      return <Home />
    }
    if (chatMatch) {
      return <Chat />
    }
    if (journalMatch) {
      return <Journal />
    }
    if (toolsMatch) {
      return <Tools />
    }
    

    return (
      <div>
        404 That page does not exist
      </div>
    )
  })()

  return (
    <div className='w-screen h-screen flex flex-col ' >
      <div className='flex-1 '>
        {PAGE}
      </div>
      <BottomNav />
    </div>
  )
}

export default App
