import{ useEffect, useState } from 'react'
import Avatar from '../components/Avatar'
import { IoIosSend } from 'react-icons/io';
import { getCurrentDate } from '../utils/dateFormat';
import { addMessageToDB, getAllMessagesFromDB } from '../utils/db' // Import functions to interact with DB (API calls)

/**
 * @author @ledaniel03
 * @description Handles the user interface for a chat system, allowing users to send and receive messages.
 * Implements message loading, display, and asynchronous sending through the use of utilities for database interactions.
 * Includes dynamic message updating and input validation.
 */


interface IChatMessage { mes: string, type: 'in' | 'out', time: number }
const Chat = () => {
  const [mes, setMes] = useState('')   // contains typed message (input)
  const [sessionId, setSessionId] = useState(1) // session id for chat
  const [message, setMessages] = useState([] as IChatMessage[])
  const [sending, setSending] = useState(false)

  // on mount hook, to load messages
  useEffect(() => {
    reloadMessages()
  }, [])

  // separate components and methods (with a dir for each component & util files) for better organization
  useEffect(() => {
    scrollToBottom(); // scrolls to bottom on refreshes or new messages (mounting and re-renders)
  }, [])

  // Function to scroll to bottom of chat window (Created a div at the bottom of chat container & scrolled to)
  const scrollToBottom = () => {
    const mesEnd = document.getElementById('mes-end');
    // show new message, after a delay(wait for react to update)
    setTimeout(() => {
      if (mesEnd != null) // Added null check so the error isn't thrown by TS below
        mesEnd.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });  // Error won't occur, but TS doesn't understand DOM timing/availability 
    }, 200);
  }

  const sendMessage = async () => {
    if (sending) return
    if (mes.length < 3) {
      alert('Message is too short!')
      return
    }
    setSending(true)
    const res = await addMessageToDB(mes, 1)
    setMes(''); // Clear the input field after sending the message

    if (res) {
      reloadMessages()
    }
    console.log('result', res)
    setSending(false)
  }

  const reloadMessages = async () => {
    const [status, data] = await getAllMessagesFromDB(sessionId)
    if (!status) {
      console.error('reloading messages failed')
      return
    }
    console.log(data)
    if (Array.isArray(data)) {
      setMessages(data as IChatMessage[])
    }
    scrollToBottom()
  }

  // Incoming message Component
  const IncomingMessage = ({ mes }: { mes: IChatMessage }) => { // Add props for fields- message content, sender, timestamp, etc.
    return (
      <div className='chat chat-start'>
        <div className='chat-bubble text-white bg-sky-700'>{mes.mes}</div>
      </div>
    );
  }

  // Outgoing message Component
  const OutgoingMessage = ({ mes }: { mes: IChatMessage }) => { // Add props for fields- message content, sender, timestamp, etc.
    return (
      <div className='chat chat-end'>
        <div className='chat-bubble text-white bg-teal-600'>{mes.mes}</div>
      </div>
    );
  }

  // Parent chat component
  return (
    <div className='relative flex flex-col h-full w-full bg-gradient-to-b from-teal-50 to-slate-50'> {/* Chat page root container & bg*/}
      <div className='flex flex-col items-center my-4 gap-2 text-sky-900'> {/* Chat header */}
        <Avatar /> {/* Avatar component, later replace w our logo */}
        {getCurrentDate()} {/* util dateFormat function */}
      </div>

      {/* Change the message container & input section to be like discord. Set container height & min + max input heights that respond to input size*/}
      {/* Messages container, grows/fills remaining space (max 68 vh)*/} {/* replace w fixed position if there's responsive issues on smaller phones (browser isn't accurate)*/}
      <div className='flex flex-col flex-grow max-h-[calc(100vh-6vh-230px)] overflow-y-auto gap-4'>
        {message.map(mes => {
          // Check if message is incoming or outgoing (for styling & alignment)
          if (mes.type === 'in') {
            return <OutgoingMessage mes={mes} /> /* Outgoing Message component test/ for demo*/
          } else {
            return <IncomingMessage mes={mes} /> /* Incoming Message component test/ for demo*/
          }
        })}
        <div id='mes-end'></div> {/* Div to scroll to bottom of chat window */}
      </div>
      <div className='flex h-[8vh] justify-center items-center my-1'>
        <div className='flex w-[90vw] h-[6vh] rounded-full border-2 border-teal-600 items-center justify-between'>
          <input className='flex flex-grow ml-3 text-sky-900 bg-slate-50 focus:outline-none placeholder-inherit' type='text' id='small-input' placeholder='Write a message...'
            value={mes} onChange={e => setMes(e.target.value)} />
          <button className={`${!sending ? 'text-teal-600 hover:text-teal-700' : "text-gray-200 cursor-default"} text-4xl mr-5`}
            onClick={sendMessage}> <IoIosSend /> </button>
        </div>
      </div>

    </div>
  )
}

export default Chat;
