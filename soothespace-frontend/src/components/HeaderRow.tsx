import { useLocation } from "wouter"
import Avatar from "./Avatar"
import { IoSettings } from "react-icons/io5"
import LogoutButton from "./LogoutButton"

/**
 * @author @ledaniel03
 * @description Settings: displays a settings icon that, when clicked, navigates the user to the settings page. Positioned fixed at the top right of the viewport to ensure constant access.
 *  HeaderRow: renders the top header row of the application, integrating crucial navigation and user interface elements such as the Avatar, page title, settings icon, and logout button. Facilitates user interaction and navigation.
 */
 

const Settings = () => {
    const [loc, nav] = useLocation()
    const showSettings = () => {
      nav('/settings')
    }
    return (
      <div className="fixed top-2 right-[90px] " >
        <IoSettings className="text-[2rem] cursor-pointer"
          onClick={showSettings} />
      </div>
    )
  }
  

export const HeaderRow = ({ title }: { title: string}) => {

    return (
        <div className='bg-slate-50 flex items-center justify-between py-1 px-1'>
            <div className="flex flex-col items-start gap-1">
                <Avatar />
                <div className="flex gap-2 items-center pl-3" >
            {/*        <Icon className='text-black' size={30} /> */}
                    <div className="text-black font-bold text-3xl  font-sans" >{title}</div>
                </div>
                <Settings  />
                <LogoutButton />

            </div>
        </div>
    )
}
