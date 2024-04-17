import React, { useState } from 'react'
import { FaCalendarAlt, FaDumbbell, FaFootballBall, FaCouch, FaFilm, FaGamepad, FaBook, FaBroom, FaBed, FaUtensils, FaShoppingBag } from 'react-icons/fa';
import { MdFamilyRestroom } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

const NewJournal = ({ setOpen }: { setOpen: Function }) => {  // If setOpen is true, the popup will be visible & display each component depending on our step state.
    const [step, setStep] = useState(0)
    const [mood, setMood] = useState('')
    const [actions, setActions] = useState([] as string[])

    const options = [
        { val: "😄", name: "Joyful" },
        { val: "🙂", name: "Good" },
        { val: "😐", name: "Neutral" },
        { val: "😔", name: "Sad" },
        { val: "😢", name: "Awful" },
    ]

    const options2 = [
        { icon: MdFamilyRestroom, name: "Family" },
        { icon: FaUserFriends, name: "Friends" },
        { icon: FaCalendarAlt, name: "Date" },
        { icon: FaDumbbell, name: "Exercise" },
        { icon: FaFootballBall, name: "Sports" },
        { icon: FaCouch, name: "Relax" },
        { icon: FaFilm, name: "Movies" },
        { icon: FaGamepad, name: "Gaming" },
        { icon: FaBook, name: "Reading" },
        { icon: FaBroom, name: "Cleaning" },
        { icon: FaBed, name: "Resting" },
        { icon: FaUtensils, name: "Health" },
        { icon: FaShoppingBag, name: "Shopping" },
    ];
    const getTodayValue = () => {
        const d = new Date()
        const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const month = months[d.getMonth()]
        const date = d.getDate()
        const hrs = d.getHours() % 12
        let minutes = '' + d.getMinutes()
        if (minutes.length < 2) {
            minutes = '0' + minutes
        }
        const extra = d.getHours() > 12 ? "PM" : "AM"
        return `${month} ${date}, ${hrs}:${minutes} ${extra}`
    }
    const NextButton = ({ active }: { active: boolean }) => {
        const extraNextClasses = !active ? ' bg-slate-200 ' : ' bg-teal-500 cursor-pointer '
        return (
            <div className={'absolute bottom-2 right-2 px-2 py-1 rounded-sm font-bold text-white drop-shadow-sm  ' + extraNextClasses}
                onClick={() => setStep(step + 1)} >
                Next
            </div>
        )
    }
    const FinishButton = () => {
        return (
            <div className={'absolute bottom-2 right-2 px-2 py-1 rounded-xl font-bold text-white drop-shadow-sm   bg-teal-500 cursor-pointer '}
                onClick={() => {
                    setOpen(false)
                }} >
                Save Journal
            </div>
        )
    }

    if (step === 0) {
        return (
            <div className='text-center bg-white py-16 px-4 rounded-xl drop-shadow-sm flex flex-col items-center gap-3 w-[95vw] max-w-[95vw] relative' >
                <div className='font-bold text-xl ' >How are you feeling?</div>
                <div className='flex items-center gap-3' >
                    <FaCalendarAlt size={16} />
                    <div className='underline text-teal-500 ' >{getTodayValue()}</div>
                </div>
                <div className='flex flex-wrap justify-center gap-2 mt-6' >
                    {options.map(p => {
                        const extraClasses = p.name === mood ? 'bg-slate-200' : ''
                        return (
                            <div className={'flex flex-col items-center hover:bg-slate-200 px-2 rounded-md cursor-pointer bg-slate ' + extraClasses}
                                onClick={() => setMood(p.name)} >
                                <div className=' text-[2.1rem]' >{p.val}</div>
                                <div className='text-slate-600 font-bold text-sm' >{p.name}</div>
                            </div>
                        )
                    })}
                </div>
                <div className='mt-2 font-bold text-sm ' >{mood}</div>
                <NextButton active={mood !== ''} />
            </div>
        )
    }
    if (step === 1) {
        return (
            <div className='text-center bg-white py-16 px-4 rounded-xl drop-shadow-sm flex flex-col items-center gap-2 max-w-[95vw] relative' >
                <div className='font-bold text-xl ' >What have u been up to?</div>
                <div className='flex flex-wrap justify-center gap-4 mt-8' >
                    {options2.map(p => {
                        const extraClasses = actions.includes(p.name) ? 'bg-slate-200' : ''
                        const Icon = p.icon
                        const updateActions = () => {
                            const newActions = [...actions]
                            if (actions.includes(p.name)) {
                                newActions.splice(newActions.indexOf(p.name), 1)
                            } else {
                                newActions.push(p.name)
                            }
                            setActions(newActions)
                        }
                        return (
                            <div className={'flex flex-col items-center hover:bg-slate-100 px-2 pt-1 rounded-md cursor-pointer bg-slate ' + extraClasses}
                                onClick={() => updateActions()} >
                                <div className=' text-[1.5rem] text-teal-500' ><Icon /></div>
                                <div className='text-slate-600 text-sm ' >{p.name}</div>
                            </div>
                        )
                    })}
                </div>
                <NextButton active={actions.length > 0} />
            </div>
        )
    }
    if (step === 2) {
        return (
            <div className='text-center bg-white py-10 px-4 rounded-xl drop-shadow-sm flex flex-col items-center gap-7 h-[62.5vh] max-h[62.5vh] w-[100vw] max-w-[100vw] relative' >
                <div className='font-bold text-xl ' >Anything To Share?</div>
                <div className='flex flex-wrap justify-center gap-2' >
                    <textarea name="" id="" placeholder='Describe your day (optional) ... '
                        className='border p-2 bg-slate-100 min-w-[90vw] min-h-[45vh] ' ></textarea>
                </div>
                <FinishButton />
            </div>
        )
    }
    return (
        <div>NewJournal</div>
    )
}

export default NewJournal