import React from 'react'
import { HeaderRow } from '../components/HeaderRow';
import BreathingTool from './BreathingTool';

// use carousel (DaisyUI) for tools
// make a component for the carousel sections as we'll be reusing them

const Toolbox = () => {

    const Featured = () => {
        return(
            <div className="flex-1 card h-[18vh] w-[90vw] bg-gradient-to-r from-emerald-200 to-teal-200 shadow-xl mb-6 text-slate-600">
                <div className="card-body gap-1">
                    <div className="font-semibold text-sm">Featured Tool</div>
                    <h2 className='card-title'>Breathing for Stress</h2>
                    <div className="card-actions justify-start">
                        <BreathingTool/>
                    </div>
                </div>
            </div>
        );
    }

    const Carousel = () => { // Add props for heading (ex: Positivity: [Item/link 1, Image, alt], [Item/link 2, Image, alt] )  || For demo, we can probably make this barebones & do without the backend API
        return (
            <div className="flex flex-row h-fit w-[95vw] carousel ml-2 mb-5 gap-5"> {/* Carousel container (DaisyUI unstyled component) */}
                <div className="carousel-item h-[15vh] w-[35vw]">
                    <img className= "w-full h-auto rounded-3xl" 
                    src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" 
                    alt="Cone" />
                </div> 
                <div className="carousel-item h-[15vh] w-[35vw]">
                    <img className= "w-full h-auto rounded-3xl" 
                    src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" 
                    alt="Grapes" />
                </div> 
                <div className="carousel-item h-[15vh] w-[35vw]">
                    <img className= "w-full h-auto rounded-3xl" 
                    src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" 
                    alt="Cone" />
                </div> 
                <div className="carousel-item h-[15vh] w-[35vw]">
                    <img className= "w-full h-auto rounded-3xl" 
                    src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" 
                    alt="Grapes" />
                </div> 

            </div>
        );
    }

    const ToolPanel = () => {
        const toolHeadings = ["Positivity", "Anxiety", "Sleep"]

        return (
            <div>
                {toolHeadings.map((heading, index) => ( // Mapping toolsHeading (heading new val) (index's inbuilt & used to loop array | ES6)
                    <div key={index} className='flex flex-col text-slate-600 font-bold text-2xl font-sans ml-3 gap-4 '>
                        {heading}
                        <Carousel/> {/* Call w necessary props (just heading should be fine)*/}

                    </div>
                ))}
            </div>
        );
    }

    
    return (
        // Kept 90vh instead of full bc scrolling & previously bottom nav (before position-fixed)
        <div className='relative h-[90vh] flex flex-col bg-slate-50 pt-5 gap-5 flex-grow'>
            <HeaderRow title='Toolbox'/> 
            <div className='flex flex-col overflow-y-scroll'>
                <div className='flex flex-col items-center '> 
                    <Featured/> 
                </div>
                <div className='flex flex-col'>
                    <ToolPanel/>
                </div>
            </div>
            
        </div>
    )
}

export default Toolbox;