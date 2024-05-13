// import React, { FC } from 'react'
import { GoHomeFill } from "react-icons/go";
import { RiMentalHealthFill } from "react-icons/ri";
import { IoIosChatbubbles,  } from "react-icons/io";
import { FaJournalWhills } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import { useLocation } from 'wouter';

/**
 * @author @ledaniel03
 * @description Provides a bottom navigation bar for the application, 
 * allowing easy navigation between different sections such as Home, Chat, Journal, Mood, and Meditation. 
 * Each option is represented by an icon and a label.
 */


// Definition of the BottomNav functional component
const BottomNav = () => {
    // Using the useLocation hook to get the current URL and a navigate function for changing pages
    const [location, navigate] = useLocation()

    //console.log(location)

    // Array defining the properties for each navigation option
    const options = [
        { name: 'Home', url: '/', icon: GoHomeFill },
        { name: 'Chat', url: '/chat', icon: IoIosChatbubbles },
        { name: 'Journal', url: '/journal', icon: FaJournalWhills },
        { name: 'Mood', url: '/mood', icon: RiMentalHealthFill }, // Placeholder for mood tracker or journal (if moving tabs for UX purposes)
        { name: 'Unwind', url: '/meditation', icon: GiMeditation },
    ]

    // OptionItem component for rendering each navigation option
    const OptionItem = ({ p }: { p: { name: string, url: string, icon: any } }) => {
        const Icon = p.icon  // Storing icon component for later use
        // Conditional class addition: add a background color if the current page is the option's target url
        const extraClasses = p.url === location ? " bg-teal-500 " : "" // Give selected icon text a different color instead of highlight?

        return ( // Bottom nav icon & page name 
            <div className={`flex flex-col items-center pt-2 pb-6 w-[20vw] px-1 my-0 rounded-sm cursor-pointer ${extraClasses}`} // Width 20% vw (5 components, no gap needed)
                onClick={() => navigate(p.url)}> {/* Navigate to the option's target url on click */}
                <Icon size={30} className='pt-0.5 text-white ' />
                <div className='pt-0.5 font-bold text-white text-sm' >{p.name}</div> {/* Displaying the name of the route */}
            </div>
        )
    }
    return ( // Bottom nav page-names, passing page-names & rendering OptionItem component
        <div className='bg-[#10a697] flex justify-center' >
            {options.map(p => <OptionItem key={p.name} p={p} />)} {/* Mapping over options to create an OptionItem for each */}
        </div>
    )
}

export default BottomNav