import React from 'react'
import Avatar from "../components/Avatar"
import { IoIosSend } from "react-icons/io";

const Chat = () => {

  // Message Component
  const IncomingMessage = () => { // Add props for fields- message content, sender, timestamp, etc.
    return (
        <div className="chat chat-start">
          <div className="chat-bubble text-white bg-sky-700">It's over Anakin, <br/>I have the high ground.</div>
        </div>
    );
}

    // Message Component
    const OutgoingMessage = () => { // Add props for fields- message content, sender, timestamp, etc.
      return (
        <div className="chat chat-end">
          <div className="chat-bubble text-white bg-teal-600">You underestimate my power!</div>
        </div>
      );
    }

  return (
    <div className='relative flex flex-col h-full w-full bg-gradient-to-b from-teal-50 to-slate-50'> {/* Chat page root container & bg*/}
      <div className='flex flex-col items-center my-6 gap-2 text-sky-900'> {/* Chat header */}
        <Avatar /> {/* Avatar component, later replace w logo */}
        Thu Apr 25 2024
      </div>

      {/* Messages container, grows/fills remaining space (max 68 vh)*/} {/* replace w fixed position if there's responsive issues on smaller phones (browser isn't accurate)*/}
      <div className='flex flex-col flex-grow max-h-[67vh] overflow-y-auto gap-4'> 
          <IncomingMessage/> {/* Incoming Message component test/ for demo*/}
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
      </div>
      <div className='flex h-[8vh] justify-center items-center my-1'>
        <div className='flex w-[90vw] h-[6vh] rounded-full border-2 border-teal-600 items-center justify-between'> 
            <span className='ml-3 text-sky-900'>Write a message... </span> {/* Add in message input field/form here*/}
            <button className='text-teal-600 hover:text-teal-700 text-4xl mr-5'> <IoIosSend/> </button>
        </div> 
      </div>

    </div>
  )
}

export default Chat