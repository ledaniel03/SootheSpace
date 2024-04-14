import React from 'react'
import { RiTodoFill } from "react-icons/ri";
import { HeaderRow } from '../components/HeaderRow';
import { usePopup } from '../hooks/usePopup';
import NewJournal from './NewJournal';

const Journal = () => {
    // Add methods to load journal entries, add new journal entries (& a controller to pull and add from DB), and delete journal entries 
    // Need a entry component to display journal entries & a component to enlarge it when clicked (STRETCH)
    
    // History entry component to display journal entries (maybe use entry & index as props?) To pull from DB /array mapping & display, will need a TS interface
    const Entry = () => {
        return (
            <div className="flex flex-col bg-white p-2 m-2 rounded-lg shadow-md">
                <div className="font-bold text-lg">Title</div>
                <div className="text-sm">Content</div>
            </div>
        );
    }

     
    /* 
        Destructure the usePopup hook that handles popup visibility and content. (Renaming as mentioned below)
        setFormOpen: function to toggle popup open/closed state. (setOpen renamed to setFormOpen) (Value stems from usePopup hook)
        newForm: React component (popup content) returned by the hook. (comp renamed to newForm) (Value stems from usePopup hook)

        So, setOpen & comp are properties returned by the usePopup hook, and they are assigned to setFormOpen and newForm respectively. 
        This assignment happens because they are on the right side of the = sign in the destructuring statement

        We renamed for clarity and context in its usage within the Journal component.

        usePopup is being called w the newJournal component as an argument. Designed to manage the logic and state to the popup component. (If true blackbox displays)

        Why? Journal doesn't use the popup, but newJournal does. So this way we can render the usePopup hook to show the blackbox when the newJournal component is called.

        TLDR: passing props & destructuring them to manage the popup state in the Journal component.
    */

    //  prop passed to the NewJournal component, setOpen prop is given a function that takes a boolean parameter e and then calls another function setFormOpen with this parameter.
    const { setOpen: setFormOpen, comp: newForm } = usePopup(<NewJournal setOpen={(e:boolean)=>setFormOpen(e)}/>) 
    // e will be a boolean (type declared) 
    // setOpen prop defined on the NewJournal component so whenever setOpen is called within, it'll call setFormOpen w the same boolean value e it receives. 
    // Linking NewJournal component's internal logic and setFormOpen function which controls the visibility of the popup.

    return (
        <div className='relative h-full flex flex-col bg-slate-50 pt-10 gap-5'>
            <HeaderRow title='Start Journaling'/> {/* Calling HeaderRow component w/ Title text & Icon (removed icon)*/}
            
            <div className="flex flex-col justify-center gap-4">
                <div className="text-black font-bold text-md font-sans ml-5">Quick Start</div>
                <button className="bg-teal-500 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-md w-11/12 self-center"
                    onClick={() => setFormOpen(true)}
                >
                    Start Today's Journal
                </button>
            </div>

            <div className='flex flex-col max-h-[calc(100vh-120px)] text-black overflow-auto bg-teal-500' >
                <div className='flex ml-5 font-bold shadow-md' >
                    Entries

                </div>

          

            </div>
 
            {newForm}
        </div>
    )
}

export default Journal