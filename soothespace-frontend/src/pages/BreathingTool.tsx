import {useState, useEffect} from 'react'
import { IoIosArrowBack } from "react-icons/io";

// To-do: Add music, (water ripple effects w animations lib?)
// Gradient bg would look nicer (sky-400 & sky-500 top to bottom) (same for the radial with its values) (would need 2 hooks- start and end color state's for this)
// Modify useEffect so we can decouple the text in the inhale/exhale steps & animate them w/o re-renders affecting them
// Maybe confetti or some sort of celebration effect on end component?

// Using TS, FC is a type alias for React.FunctionComponent
const BreathingTool: React.FC = () => { 
    const [bgColor, setBgColor] = useState('bg-sky-400') 
    const [radialColor, setRadialColor] = useState('bg-sky-300')
    const [action, setAction] = useState('inhale')
    const [step, setStep] = useState(0)
    const [progress, setProgress] = useState(0)
    const [cycle, setCycle] = useState(false) // Keep this outside of inhalePanel, was reset to false every time inhalePanel rerendered (maybe useReducer would provide a nicer solution)
    const[cycleCount, setCycleCount] = useState(0) // Count the number of cycles completed
    const [countdown, setCountdown] = useState(8) // Countdown for title page 

    // Component for initial intro
    const IntroTitle: React.FC = () => {
        useEffect(() => {
            if (countdown <= 0) {
                setStep(1);  // Move to the next step once countdown reaches 0
            }
    
            // Set timer to decrement the countdown every second
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
    
            // Cleanup function to clear timer
            return () => clearTimeout(timer);
        }, [countdown]);  // countdown dependency to iterate/re-render countdown each second
    
        return (
            <div className='flex flex-col items-center gap-8'>
                <h3 className="animate-bounce font-semibold text-white text-3xl mt-8">Breathing for Stress</h3>
                <span className="animate-pulse countdown font-semibold text-white text-3xl">
                    <span style={{"--value": countdown}}></span>
                </span>
            </div>
         );
    };
    
    // Component for breathing content
    const InhalePanel: React.FC = () => {
        // State for cycle completion (false = sky-400, true = indigo-500), hooks dependent on cycle

        // useEffect calls when component mounts and on re-renders (empty array to only run useEffect on component mount) || 
        useEffect(() => {
            // Window method to call a function at specified intervals until cleared or window is closed
            const intervalId = setInterval(() => {
                setProgress(prevProgress => { // define prevProgress to increment progress
                    if (prevProgress >= 100) {
                        // console.log(cycle)
                        setCycle(prevCycle => !prevCycle); // Toggle cycle completion (true to false, false to true) (for bg color change)
                        setCycleCount(cycleCount + 1); // Increment cycle count
                        return 0; // Reset progress
                    }
                    return prevProgress + 0.1; // Increments progress by .1 if not >= 100
                });
            }, 8); // 8 second cycles, we update the progress counter every 10ms
    
            return () => clearInterval(intervalId); // method clears the timer that was set w setInterval
        }, []);

        // Handles our logic after a cycle completion 
        useEffect(() => {
            if (cycleCount >= 4) { // If 2 cycles are completed, move to next step
                setStep(2);
            }

            cycle ? setBgColor('bg-indigo-500') : setBgColor('bg-sky-400'); // Change bg color based on cycle completion
            cycle ? setRadialColor('bg-indigo-400') : setRadialColor('bg-sky-300'); 
            cycle ? setAction('exhale') : setAction('inhale'); 

        }, [cycle]);  // Only change color when cycle changes

    
        return ( // InhalePanel's rerendering bc of setProgress iteration is messing w animate-bounce for "Deep Breaths" & "Inhale" by constantly re-rendering, must decouple
            <div className='flex flex-col items-center gap-16'>
                <h3 className="animate-bounce font-semibold text-white text-3xl">Deep Breaths</h3> 
                {/* Radial Progress Component Modified*/}
                <div className={`radial-progress ${radialColor} font-semibold text-2xl text-white`}
                    style={{"--value":progress, "--size": "18rem", "--thickness":"0.6rem"}} role="progressbar"> 
                    <span className='text-3xl animate-bounce tracking-wider'>{action}</span>
                </div>
            </div>
        );
    }

    const EndPanel: React.FC = () => {

        return (
            <div className='flex flex-col items-center gap-4'>
                <h3 className="animate-bounce font-semibold text-white text-3xl tracking-wide mb-16"> Congratulations </h3> 
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
            case 2:
                return <EndPanel />;
            default:
                return <IntroTitle />;
        }
    };

    return (
        <div className='flex w-[25vw]'>
            <button className="flex-grow bg-emerald-400 hover:bg-emerald-500 text-slate-100 font-bold py-1 mt-1 rounded-3xl w-4/12" onClick={()=>document.getElementById('my_modal_3').showModal()}>Try now</button>
           
            {/* Modal for Breathing Tool (prompted by onClick) */}
            <dialog id="my_modal_3" className={`modal ${bgColor}`}> {/* {`${value}` to interpolate like f-strings} (Hooks for bg-color)*/}

                <div className={`modal-box h-screen w-[90vw] ${bgColor} shadow-none flex flex-col gap-12`}>
                    <form method="dialog">
                         {/* & if there's a button in form, it'll close the modal + set the all pages hooks to their initial value */}
                        <button onClick={() => {setStep(0);setBgColor('bg-sky-400'); setRadialColor('bg-sky-300'); setAction('inhale'); setProgress(0); setCycle(false); setCountdown(8); setCycleCount(0);}} 
                            className="text-xl text-white btn btn-sm focus:outline-none btn-ghost mt-2 absolute left-2 top-1"> <IoIosArrowBack/> Back 
                        </button>
                    </form>

                    <div className='flex flex-col items-center mt-16'>
                            {getComponentForStep(step)} {/* Display the current step's component */}
                    </div>

                 </div>
            </dialog>
        </div>
    )
}


export default BreathingTool;