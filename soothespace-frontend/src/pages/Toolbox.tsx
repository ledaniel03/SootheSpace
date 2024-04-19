import React from 'react'
import { HeaderRow } from '../components/HeaderRow';

// use carousel (DaisyUI) for tools
// make a component for the carousel sections as we'll be reusing them

const Toolbox = () => {
    const toolHeadings = ["Positivity", "Anxiety", "Sleep", "Depression", "Anger", "Self-esteem" ]

    const ToolPanel = () => {
        return (
            <div>
                {toolHeadings.map((heading, index) => ( // Mapping toolsHeading (heading new val) (index's inbuilt & used to loop array | ES6)
                    <div key={index} className='text-black font-bold text-3xl font-sans ml-5'>
                        {heading}
                        {/* Add a component for the carousel items under heading*/}
                    </div>
                ))}
            </div>
        );
    }
    
    return (
        <div className='relative h-full flex flex-col bg-slate-50 pt-5 gap-5'>
            <HeaderRow title='Toolbox'/> 
            <div className='flex flex-col justify-center gap-4'>
            <ToolPanel/>
            

            </div>

        </div>
    )
}

export default Toolbox