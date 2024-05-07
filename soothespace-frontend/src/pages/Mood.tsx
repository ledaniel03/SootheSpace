import React from "react"
import { HeaderRow } from '../components/HeaderRow';
import Calendar from './Calendar';

// separate file for the newMood component questions

const Mood = () => {
    // const { setOpen: setFormOpen, comp: newForm } = usePopup(<newMood setOpen={(e:boolean)=>setFormOpen(e)}/>) 

    const Chart = () => { // Include necessary props
    }
    
    return (
        <div className='relative flex flex-col bg-slate-50 pt-5 gap-5 h-full'> 
            <HeaderRow title='Mood Tracker'/> 
            {/* Calendar Section */}
            <div className='flex flex-col items-center'>
                <Calendar/>
            </div>        

            {/* <div className='text-black font-bold text-md font-sans ml-5'>Insights</div> */}
                {/* Chart component displaying data*/}

        </div>

            
    );
}

export default Mood;