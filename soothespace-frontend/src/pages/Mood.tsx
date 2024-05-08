// import React from "react"
import { HeaderRow } from '../components/HeaderRow';
import Calendar from './Calendar';
import { ChartComponent } from "./ChartComponent";

// separate file for the newMood component questions

const Mood = () => {

    return (
        <div className='relative flex flex-col bg-slate-50 pt-5 gap-5 h-[90vh] overflow-auto'> {/* Changed h-full to h-screen */}
            <HeaderRow title='Mood Tracker'/> 
            {/*Chart Display Section */}
            <div className='flex flex-col items-center gap-6 overflow-visible' style={{ maxHeight: 'calc(100vh - 100px)' }}> {/* Adjust maxHeight as needed */}
                <Calendar/>
            </div>
            {/*Chart Display Section */}
            <div className='text-black font-bold text-md font-sans ml-5 mt-4'>Insights
                <ChartComponent/>
            </div>

        </div>          
    );
}

export default Mood;