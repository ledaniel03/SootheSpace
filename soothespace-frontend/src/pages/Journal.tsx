import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiTodoFill } from "react-icons/ri";
import { FaCalendarAlt, FaDumbbell, FaFootballBall, FaCouch, FaFilm, FaGamepad, FaBook, FaBroom, FaBed, FaUtensils, FaShoppingBag, FaFontAwesome } from 'react-icons/fa';
import { HeaderRow } from '../components/HeaderRow';
import { usePopup } from '../hooks/usePopup';
import NewJournal, { getActionIcon } from './NewJournal';
import { formatDateTime } from '../utils/dateFormat';
import { getAllEntriesFromDB } from '../utils/db'; // moved getAllEntriesFromDB to db.ts
import { IconType } from 'react-icons';


// Entry interface to define the structure of a journal entry (TS syntax: Enforces all elements in Entry object to be of type specified)
interface IEntry {
    id: number,
    user: string,
    date: number,
    mood: string,
    activity: string,
    val: string,
    index: number
}
// Emoji options for mood
const options = [
    // Each object element in array includes both val & name properties on same line (not inherently linked tho) (State's & conditional to link)
    { val: "😄", name: "Happy" },
    { val: "🙂", name: "Good" },
    { val: "😐", name: "Neutral" },
    { val: "😔", name: "Sad" },
    { val: "😢", name: "Awful" },
]


export const getEmoji = (mood: string) => {
    const moodOption = options.find(option => option.name === mood);
    return moodOption ? moodOption.val : "Mood not found";
};

export const findEmojiByMood = getEmoji

const Journal = () => {
    const [updates, refreshJornal] = useState(0)
    // Destructuring the usePopup hook to get the setOpen function and the component to display (passing props to NewJournal component)
    const { setOpen: setFormOpen, comp: newForm } = usePopup(<NewJournal setOpen={(e: boolean) => { setFormOpen(e); refreshJornal(e => e + 1) }} />)
    const [entries, setEntries] = useState([] as IEntry[]) // State to hold journal entries [array of Entry objects] (TS syntax: Enforces all elements in entries array to conform of type Entry)

    // Runs whenever component mounts and is re-rendered, empty array to only run once on component mount (tells what states to look for or props changes, then re-run the function if they change)
    useEffect(() => {
        loadEntries();
    }, [updates])

    const loadEntries = async () => {
        const newEntries = await getAllEntriesFromDB()
        console.log(newEntries)
        setEntries(newEntries as any)
    };

    /* Add methods to load journal entries, add new journal entries (& a controller to pull and add from DB), and delete journal entries 
       Need a entry component to display journal entries & a component to enlarge it when clicked (STRETCH)
       History entry component to display journal entries (maybe use entry & index as props?) To pull from DB /array mapping & display, will need a TS interface
    */
    const Entry = ({ date, mood, activity, val }: IEntry) => {
        const dateTime = formatDateTime(date.toString()); // Convert date to readable format (via util function)
        const activities = (() => {
            const actions = activity.split(',')
            const data = [] as [IconType, string][]
            for (const act of actions) {
                const icon = getActionIcon(act)
                data.push([icon, act])
            }
            return data.map(d => {
                const Icon = d[0]
                return (<div className='flex gap-1' >
                    <Icon className='w-4 h-4 ' />
                    <div >{d[1]}</div>
                </div>)
            })
        })()
        return (
            <div className='flex flex-col font-medium rounded-md shadow-md my-2 bg-slate-0'>
                {/* container for the entry's date*/}
                <div className="pl-20 text-white text-lg rounded-t-md bg-teal-500">{dateTime.date}</div> {/* Date via db & convert format */}

                {/* container for the entry's mood, activity, and note*/}
                <div className='flex flex-row text-teal-500 tracking-tight py-3'>
                    <div className='flex flex-row font-normal text-5xl gap-3'> {getEmoji(mood)}

                        <div className='flex flex-col justify-start font-normal text-2xl'> {/* Mood entry via db */}
                            {mood}
                            <div className='flex flex-row flex-wrap font-normal text-sm gap-2'>
                                {...activities}
                            </div>
                            <div className='flex text-sm text-slate-500 mt-4 gap-1'> <span className='font-semibold'>Note: </span> {val} </div> {/* Journal entry via db */}
                        </div>
                    </div>
                    <div className='flex grow justify-end'>
                        <div className='font-normal text-slate-400 text-sm mt-2 mr-6'> {dateTime.time} </div> {/* Time via db  (with date, just convert)*/}
                    </div>
                </div>
            </div>
        );
    }
    console.log(entries)
    return (
        // Changed navbar to position fixed, can set to 100vh or full now
        <div className='relative flex flex-col bg-slate-50 pt-5 gap-5 h-full'> {/* Journal root container */}
            <HeaderRow title='Start Journaling' /> {/* Calling HeaderRow component w/ Title text & Icon (removed icon)*/}

            <div className='flex flex-col justify-center gap-4'>
                <div className='text-black font-bold text-md font-sans ml-5'>Quick Start</div>
                <button className='bg-teal-500 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-sm w-9/12 self-center'
                    onClick={() => setFormOpen(true)}
                >
                    Start Today's Journal
                </button>
            </div>

            <div className='flex flex-col mt-8 mx-5 text-2xl font-bold h-[55vh] text-black overflow-y-auto gap-1' > {/* Journal Entries container */}
                Entries
                {entries.map((entry, index) =>
                    <Entry id={entry.id} user={entry.user} date={entry.date} mood={entry.mood} activity={entry.activity} val={entry.val} index={index} /> // Mapping over entries array to create an Entry component for each entry stored in the state
                )}

            </div>

            {newForm} { /* Displaying the newForm component (our active component depending on step state) via NewJournal */}
        </div>
    )
}

export default Journal;