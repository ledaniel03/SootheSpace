import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
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
        labels: ['Moods'], // General label for the x-axis, can be empty if you prefer
        datasets: [
            {
                label: 'Happy',
                data: [moodCounts.Happy],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3
            },
            {
                label: 'Good',
                data: [moodCounts.Good],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 3
            },
            {
                label: 'Neutral',
                data: [moodCounts.Neutral],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 3
            },
            {
                label: 'Sad',
                data: [moodCounts.Sad],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3
            },
            {
                label: 'Awful',
                data: [moodCounts.Awful],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 3
            }
        ]
    };
    
    return (
        <div className="flex flex-col space-y-4 p-4">
            <div className=' bg-slate-100 p-4 shadow-md rounded-xl h-[30vh]'>
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
};