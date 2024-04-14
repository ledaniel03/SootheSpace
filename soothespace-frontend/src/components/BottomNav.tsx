import React, { FC } from 'react'
import { GoHomeFill } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosChatbubbles,  } from "react-icons/io";
import { FaJournalWhills } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { useLocation } from 'wouter';

const BottomNav = () => {
    const [location, navigate] = useLocation()

    console.log(location)
    const options = [
        { name: 'Home', url: '/', icon: GoHomeFill },
        { name: 'Chat', url: '/chat', icon: IoIosChatbubbles },
        { name: 'New', url: '/', icon: IoAddCircleOutline }, // Will replace move button w its own url route & component (maybe? remove the new text and just enlarge icon to fill space as a div)
        { name: 'Journal', url: '/journal', icon: FaJournalWhills },
        { name: 'Tools', url: '/tools', icon: GrResources },
    ]
    const OptionItem = ({ p }: { p: { name: string, url: string, icon: any } }) => {
        const Icon = p.icon
        const extraClasses = p.url === location ? " bg-teal-500 " : "" // Give selected icon text a different color as well?

        return (
            <div className={`flex flex-col items-center py-1 px-1 my-0 rounded-sm cursor-pointer ${extraClasses}`}
                onClick={() => navigate(p.url)}>
                <Icon size={22} className='text-white ' /> 
                <div className='font-bold text-white text-sm' >{p.name}</div>
            </div>
        )
    }
    return (
        <div className='bg-[#10a697] flex justify-center gap-6' > {/* find a curved SVG for navbar bg, used a custom color hex between teal-500 & teal-600 */}
            {options.map(p => <OptionItem key={p.name} p={p} />)}
        </div>
    )
}

export default BottomNav