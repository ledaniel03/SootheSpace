import React, { useEffect } from 'react'
import Avatar from "../components/Avatar"
import { IoIosSend } from "react-icons/io";
import { getCurrentDate } from '../utils/dateFormat';

const Chat = () => {
  // separate components and methods (with a dir for each component & util files) for better organization
  useEffect(() => { 
    scrollToBottom(); // scrolls to bottom on refreshes or new messages (mounting and re-renders)
  }, [])

  // Function to scroll to bottom of chat window (Created a div at the bottom of chat container & scrolled to)
  const scrollToBottom = () => {
    const mesEnd = document.getElementById('mes-end');
    // show new message, after a delay(wait for react to update)
    setTimeout(() => {
      if (mesEnd!=null) // Added null check so the error isn't thrown by TS below
        mesEnd.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });  // Error won't occur, but TS doesn't understand DOM timing/availability 
    }, 200);
  }
   

  // Incoming message Component
  const IncomingMessage = () => { // Add props for fields- message content, sender, timestamp, etc.
    return (
        <div className="chat chat-start">
          <div className="chat-bubble text-white bg-sky-700">It's over Anakin, <br/>I have the high ground.</div>
        </div>
    );
}

    // Outgoing message Component
    const OutgoingMessage = () => { // Add props for fields- message content, sender, timestamp, etc.
      return (
        <div className="chat chat-end">
          <div className="chat-bubble text-white bg-teal-600">You underestimate my power!</div>
        </div>
      );
    }

  // Parent chat component
  return (
    <div className='relative flex flex-col h-full w-full bg-gradient-to-b from-teal-50 to-slate-50'> {/* Chat page root container & bg*/}
      <div className='flex flex-col items-center my-6 gap-2 text-sky-900'> {/* Chat header */}
        <Avatar /> {/* Avatar component, later replace w our logo */}
          {getCurrentDate()} {/* util dateFormat function */}
      </div>

      {/* Change the message container & input section to be like discord. Set container height & min + max input heights that respond to input size*/}
      {/* Messages container, grows/fills remaining space (max 68 vh)*/} {/* replace w fixed position if there's responsive issues on smaller phones (browser isn't accurate)*/}
      <div className='flex flex-col flex-grow max-h-[67vh] overflow-y-auto gap-4'> 
          <IncomingMessage/> {/* Incoming Message component test/ for demo*/} {/* Will be mapped using DB on implementation */}
          <OutgoingMessage/> {/* Outgoing Message component test/ for demo*/}
          <IncomingMessage/>
          <IncomingMessage/>
          <OutgoingMessage/>
          <OutgoingMessage/>
          <OutgoingMessage/>
          <IncomingMessage/> 
          <IncomingMessage/>
          <OutgoingMessage/>
          <IncomingMessage/>
          <div id="mes-end"></div> {/* Div to scroll to bottom of chat window */}
      </div>
      <div className='flex h-[8vh] justify-center items-center my-1'>
        <div className='flex w-[90vw] h-[6vh] rounded-full border-2 border-teal-600 items-center justify-between'>
            <input className='flex flex-grow ml-3 text-sky-900 bg-slate-50 placeholder-inherit ' type='text' id='small-input' placeholder='Write a message...'/>
            <button className='text-teal-600 hover:text-teal-700 text-4xl mr-5'> <IoIosSend/> </button>
        </div> 
      </div>

    </div>
  )
}

export default Chat