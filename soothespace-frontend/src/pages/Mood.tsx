import React from "react"
import { HeaderRow } from '../components/HeaderRow';
import newMood from './newMood';

// separate file for the newMood component questions

const Mood = () => {
    // const { setOpen: setFormOpen, comp: newForm } = usePopup(<newMood setOpen={(e:boolean)=>setFormOpen(e)}/>) 


    const Chart = () => { // Include necessary props


    }
    
    return (
        <div className='relative flex flex-col bg-slate-50 pt-5 gap-5 h-full'> 
            <HeaderRow title='Mood Tracker'/> 
            <div className='flex flex-col justify-center gap-4'>
                <div className='text-black font-bold text-md font-sans ml-5'>Quick Start</div>
                <button className='bg-teal-500 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-sm w-9/12 self-center'>
                    Track Mood
                </button> {/* onClick, call the newMood component*/}
                <div className='text-black font-bold text-md font-sans ml-5'>Insights</div></div>        
            
                {/* Chart component displaying data*/}
            </div>

            
    );
}

export default Mood;