import React, { FC } from 'react'
import { GoHomeFill } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosChatbubbles,  } from "react-icons/io";
import { FaJournalWhills } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { useLocation } from 'wouter';

// Definition of the BottomNav functional component
const BottomNav = () => {
    // Using the useLocation hook to get the current URL and a navigate function for changing pages
    const [location, navigate] = useLocation()

    console.log(location)

    // Array defining the properties for each navigation option
    const options = [
        { name: 'Home', url: '/', icon: GoHomeFill },
        { name: 'Chat', url: '/chat', icon: IoIosChatbubbles },
        { name: 'New', url: '/', icon: IoAddCircleOutline }, // Placeholder for mood tracker or journal (if moving tabs for UX purposes)
        { name: 'Journal', url: '/journal', icon: FaJournalWhills },
        { name: 'Tools', url: '/tools', icon: GrResources },
    ]

    // OptionItem component for rendering each navigation option
    const OptionItem = ({ p }: { p: { name: string, url: string, icon: any } }) => {
        const Icon = p.icon  // Storing icon component for later use
        // Conditional class addition: add a background color if the current page is the option's target url
        const extraClasses = p.url === location ? " bg-teal-500 " : "" // Give selected icon text a different color as well?

        return (
            <div className={`flex flex-col items-center pt-2 pb-6 px-1 my-0 rounded-sm cursor-pointer ${extraClasses}`}
                onClick={() => navigate(p.url)}> {/* Navigate to the option's target url on click */}
                <Icon size={30} className='pt-0.5 text-white ' /> 
                <div className='pt-0.5 font-bold text-white text-sm' >{p.name}</div> {/* Displaying the name of the route */}
            </div>
        )
    }
    return (
        <div className='bg-[#10a697] flex justify-center gap-9' >
            {options.map(p => <OptionItem key={p.name} p={p} />)} {/* Mapping over options to create an OptionItem for each */}
        </div>
    )
}

export default BottomNav