import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
// Use useStep to cycle through nested components you'll make (inhale, hold, exhale)
// Use radial progress via DaisyUI for the breathing tool (Modify it so that it's a circle that fills up & empties for our breathing tool (replace center number w instruction))

const BreathingTool = () => { // Args for if active or not || Or customization
    return (
        <div className='flex w-[25vw]'>
            <button className="flex-grow bg-emerald-400 hover:bg-emerald-500 text-slate-100 font-bold py-1 mt-1 rounded-3xl w-4/12" onClick={()=>document.getElementById('my_modal_3').showModal()}>Try now</button>
           
            {/* Modal for Breathing Tool */}
            <dialog id="my_modal_3" className="modal bg-sky-400">

                <div className="modal-box h-screen w-[90vw] bg-sky-400 shadow-none flex flex-col gap-12">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                        <button className="text-xl text-white btn btn-sm focus:outline-none btn-ghost mt-2 absolute left-2 top-1"> <IoIosArrowBack/> Back </button>
                    </form>

                    <div className='flex flex-col items-center'>
                        <h3 className="font-semibold text-white text-3xl">Breathing for Stress</h3>
                    </div>

                 </div>
            </dialog>
        </div>
    )
}


export default BreathingTool;