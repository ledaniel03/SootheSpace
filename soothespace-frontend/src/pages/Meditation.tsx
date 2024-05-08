import React, {useState} from 'react'
import { HeaderRow } from '../components/HeaderRow';
import BreathingTool from './BreathingTool';
import natureImg from '../assets/nature_meditation.jpg'
import beatsImg from '../assets/beats_meditation.avif'
import chimesImg from '../assets/chimes_meditation.png'
import natureAudio from '../assets/nature_ambience.wav'
import chimesAudio from '../assets/chimes_meditation.flac'
import beatsAudio from '../assets/beats_meditation.wav'


interface CarouselProps {
    image: string;
    altText: string;
    audioSrc: string;  // Path to the audio file
    durations: number[];  // Array of durations to play audio in seconds
  }

const Meditation = () => {
    
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

    const Carousel: React.FC<CarouselProps> = ({ image, altText, audioSrc, durations }) => {
        const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

        const handlePlayAudio = (index: number) => {
            const audioElement = document.getElementById(`audio-${altText}-${index}`) as HTMLAudioElement;
            if (!audioElement) return;
    
            if (currentlyPlaying === index) {  // If the current audio is clicked again, toggle it
                audioElement.pause();
                audioElement.currentTime = 0;
                setCurrentlyPlaying(null);
            } else {  // Stop any currently playing audio and play the clicked one
                stopAllAudios();
                audioElement.currentTime = 0;
                audioElement.play();
                setCurrentlyPlaying(index);
            }
        };
    
        const stopAllAudios = () => {
            durations.forEach((_, idx) => {
                const audio = document.getElementById(`audio-${altText}-${idx}`) as HTMLAudioElement;
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
        };
    
        return (
            <div className="flex flex-row h-fit w-[95vw] carousel ml-2 mb-5 gap-5">
                {durations.map((duration, index) => (
                    <div key={index} className="carousel-item relative h-[15vh] w-[35vw] cursor-pointer" onClick={() => handlePlayAudio(index)}>
                        <img className="w-full h-auto rounded-3xl" src={image} alt={altText} />
                        <audio id={`audio-${altText}-${index}`} src={audioSrc} preload="auto"></audio>
                        <div className="absolute top-0 left-0 text-slate-50 font-bold p-2">{Math.floor(duration/60)} min</div> {/* Add absolute positioning for the text */}
                    </div>
                ))}
            </div>
        );
    };

    
    const SoundsPanel: React.FC = () => {
        const soundHeadings = [
            { 
                title: "Nature", 
                img: natureImg, 
                alt: "Nature Meditation", 
                audioSrc: natureAudio, 
                durations: [60, 300, 900] // 1min, 5min, 15min
            },
            { 
                title: "Binaural Beats", 
                img: beatsImg, 
                alt: "Binaural Beats", 
                audioSrc: beatsAudio, 
                durations: [60, 300, 900]
            },
            { 
                title: "Chime", 
                img: chimesImg, 
                alt: "Chimes", 
                audioSrc: chimesAudio, 
                durations: [60, 300, 900]
            }
        ];

        return (
            <div>
                {soundHeadings.map((sound, index) => (
                    <div key={index} className='flex flex-col text-slate-600 font-bold text-2xl font-sans ml-3 gap-4 '>
                        {sound.title}
                        <Carousel 
                            image={sound.img} 
                            altText={sound.alt} 
                            audioSrc={sound.audioSrc} 
                            durations={sound.durations}
                        />
                    </div>
                ))}
            </div>
        );
    };

    
    return (
        // Kept 90vh instead of full bc scrolling & previously bottom nav (before position-fixed)
        <div className='relative h-[90vh] flex flex-col bg-slate-50 pt-5 gap-5 flex-grow'>
            <HeaderRow title='Meditation'/> 
            <div className='flex flex-col overflow-y-scroll'>
                <div className='flex flex-col items-center '> 
                    <Featured/> 
                </div>
                <div className='flex flex-col'>
                    <SoundsPanel/>
                </div>
            </div>
        </div>
    )
}

export default Meditation;