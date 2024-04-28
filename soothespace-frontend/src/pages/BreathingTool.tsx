import {useState, useEffect} from 'react'
import { IoIosArrowBack } from "react-icons/io";

// To-do: Add music, (water ripple effects w animations lib?), another stage/phase for exhale or relaxing (exhale will have diff bg color), & ending message
// To-do #2: Shorten the deep breathes/inhale stage (5 secs) & add a 5 sec hold before exhale (5 sec exhale) | 5-5-5

// Using TS for Functional Components
const BreathingTool: React.FC = () => { 
    const [step, setStep] = useState(0)
    const [progress, setProgress] = useState(0)

    // Component for initial intro
    const IntroTitle: React.FC = () => {
        useEffect(() => {
            const timer = setTimeout(() => {
                setStep(1);
            }, 8000); // Delay of 8 seconds before setting step to 1

            // Cleanup to clear the timer
            return () => clearTimeout(timer); 
        }, [setStep]); // Dependency array includes setStep to ensure re-binding if setStep changes (Any time setStep changes, useEffect will run)
    
        return (
            <h3 className="animate-pulse font-semibold text-white text-3xl mt-8">Breathing for Stress</h3>
         );
    };
    
    // Component for breathing content
    const InhalePanel: React.FC = () => {
        // useEffect calls when component mounts and on re-renders (empty array to only run useEffect on component mount)
        useEffect(() => {
            // Set Timeout before interval gets going (prob won't work here w useEffect tho)
            const intervalId = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
            }, 1000); // Update count every second

            return () => clearInterval(intervalId); // Cleanup interval
        }, []); // Empty dependency array ensures this hook only runs once

       
        return (
            <div className='flex flex-col items-center gap-16'>
                <h3 className="animate-bounce font-semibold text-white text-3xl">Deep Breaths</h3>
                {/* Radial Progress Component Modified*/}
                <div className="radial-progress bg-sky-300 font-semibold text-2xl text-white " 
                    style={{"--value":progress, "--size": "16rem", "--thickness":"0.6rem"}} role="progressbar">{progress}%
                </div>
            </div>
        );
    }
    
    // Function to get content for each step (Used in TSX)
    const getComponentForStep = (step: number): JSX.Element => { // Type the function parameters and return type directly
        switch (step) {
            case 0:
                return <IntroTitle />;
            case 1:
                return <InhalePanel />;
            default:
                return <IntroTitle />;
        }
    };

    return (
        <div className='flex w-[25vw]'>
            <button className="flex-grow bg-emerald-400 hover:bg-emerald-500 text-slate-100 font-bold py-1 mt-1 rounded-3xl w-4/12" onClick={()=>document.getElementById('my_modal_3').showModal()}>Try now</button>
           
            {/* Modal for Breathing Tool */}
            <dialog id="my_modal_3" className="modal bg-sky-400">

                <div className="modal-box h-screen w-[90vw] bg-sky-400 shadow-none flex flex-col gap-12">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal + reset the step & progress to 0 */}
                        <button onClick={() => {setStep(0); setProgress(0);}} className="text-xl text-white btn btn-sm focus:outline-none btn-ghost mt-2 absolute left-2 top-1"> <IoIosArrowBack/> Back </button>
                    </form>

                    <div className='flex flex-col items-center mt-16'>
                            {getComponentForStep(step)}
                    </div>

                 </div>
            </dialog>
        </div>
    )
}


export default BreathingTool;