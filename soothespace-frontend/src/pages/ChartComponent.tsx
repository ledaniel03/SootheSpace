import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getAllEntriesFromDB } from '../utils/db';

// Registering the components used by the Bar chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type Entry ={
    mood: string;
}

interface MoodCounts {
    Happy: number;
    Good: number;
    Neutral: number;
    Sad: number;
    Awful: number;
}

export const ChartComponent: React.FC = () => {
    const [moodCounts, setMoodCounts] = useState<MoodCounts>({
        Happy: 0,
        Good: 0,
        Neutral: 0,
        Sad: 0,
        Awful: 0
    });

    useEffect(() => {
        const fetchEntriesAndUpdateMoods = async () => {
            const entries = await getAllEntriesFromDB();
            const updatedMoodCounts = entries.reduce((acc: MoodCounts, entry: Entry) => {
                const moodKey = entry.mood as keyof MoodCounts; // assuring TypeScript the key type
                if (moodKey in acc) {
                    acc[moodKey]++;
                }
                return acc;
            }, {...moodCounts});
            setMoodCounts(updatedMoodCounts);
        };
        fetchEntriesAndUpdateMoods();
    }, []);
    

    const chartData = {
        labels: Object.keys(moodCounts), // object keys = mood names & values = mood counts
        datasets: [{
            data: Object.values(moodCounts),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 3
        }]
        
    };
    
    // To disable tooltip/legend "Unknown"
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(tooltipItem: TooltipItem<'bar'>) { // Explicit type for TooltipItem with generic 'bar'
                        if (typeof tooltipItem.raw === 'number') {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    };

    return (
        <div className="flex flex-col space-y-4 p-4">
            <div className=' bg-slate-100 p-4 shadow-md rounded-xl h-[30vh]'>
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
};
