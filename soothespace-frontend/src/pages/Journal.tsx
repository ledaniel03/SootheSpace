import React from 'react'
import { RiTodoFill } from "react-icons/ri";
import { FaCalendarAlt, FaDumbbell, FaFootballBall, FaCouch, FaFilm, FaGamepad, FaBook, FaBroom, FaBed, FaUtensils, FaShoppingBag, FaFontAwesome } from 'react-icons/fa';
import { HeaderRow } from '../components/HeaderRow';
import { usePopup } from '../hooks/usePopup';
import NewJournal from './NewJournal';

const Journal = () => {
    // Destructuring the usePopup hook to get the setOpen function and the component to display (passing props to NewJournal component)
    const { setOpen: setFormOpen, comp: newForm } = usePopup(<NewJournal setOpen={(e:boolean)=>setFormOpen(e)}/>) 

    // Add methods to load journal entries, add new journal entries (& a controller to pull and add from DB), and delete journal entries 
    // Need a entry component to display journal entries & a component to enlarge it when clicked (STRETCH)
    // History entry component to display journal entries (maybe use entry & index as props?) To pull from DB /array mapping & display, will need a TS interface
    const Entry = () => {
        return (
            <div className='flex-1 flex-col font-medium rounded-s shadow-md my-2 bg-slate-0'>
                <div className="pl-20 text-white text-lg bg-teal-500">Today, Apr 17</div> {/* Date via db & convert format */}

                <div className='flex flex-row text-teal-500 tracking-tight py-3'> 
                    <div className='flex flex-row font-normal text-5xl gap-3'>😄

                        <div className='flex flex-col justify-start font-normal text-2xl'> {/* Mood entry via db */}
                            HAPPY
                            <div className='flex flex-row font-normal text-sm gap-2'> 
                                <FaDumbbell className='mt-1'/>  <span className='text-slate-400'>exercise</span> {/* Activity entry via db */}
                            </div>    
                            <div className='flex text-sm text-slate-500 mt-4 gap-1'> <span className='font-semibold'>Note: </span>Today I slept in and exercised. </div> {/* Journal entry via db */}
                        </div>
                        
                        <div className='font-normal text-slate-400 text-sm mt-2'> 10:28 AM</div> {/* Time via db  (with date, just convert)*/}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='relative h-full flex flex-col bg-slate-50 pt-5 gap-5'>
            <HeaderRow title='Start Journaling'/> {/* Calling HeaderRow component w/ Title text & Icon (removed icon)*/}
            
            <div className='flex flex-col justify-center gap-4'>
                <div className='text-black font-bold text-md font-sans ml-5'>Quick Start</div>
                <button className='bg-teal-500 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-sm w-9/12 self-center'
                    onClick={() => setFormOpen(true)}
                >
                    Start Today's Journal
                </button>
            </div>

            <div className='flex flex-col mt-8 mx-5 text-2xl font-bold max-h-[calc(100vh-120px)] text-black overflow-auto' >
                    Entries
                    <Entry/>
            </div>

            {newForm} { /* Displaying the newForm component (our active component depending on step state) via NewJournal */}
        </div>
    )
}

export default Journal