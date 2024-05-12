// import { RxAvatar } from "react-icons/rx";
import sootheSpace from '../assets/soothespace_logo.png'
import { FaJournalWhills } from "react-icons/fa";

const Badge = () => {

    return (
        <div className='absolute top-[26px] right-[3px]' >
            <FaJournalWhills className='text-3xl text-blue-700 ring-2 ring-blue-900 rounded-full p-[2px]' />
        </div>
    )
}

const Avatar = () => {
    const entry_count = Number(localStorage.getItem("entry_count") || 0)
    return (
        <div className="flex flex-col items-center px-3 mb-2 relative " >
            <img src={sootheSpace} className="w-12 rounded-full" />
            {/* <div className="text-sm text-black font-medium" >Daniel Le</div> */}
            {entry_count >= 5 && <Badge />}
        </div>
    )
}

export default Avatar