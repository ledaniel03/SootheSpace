import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { getAllEntriesFromDB } from '../utils/db';
import { findEmojiByMood } from './Journal';

// Weekday names
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Entry {
    date: string;  // Assuming 'date' is a string formatted as ISO date
    mood: string;
}

const Calendar: React.FC = () => {
    // State to keep track of the currently displayed date
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [entries, setEntries] = useState<Entry[]>([]);  // Type corrected to Entry[]

    useEffect(() => {
        (async () => {
            const fetchedEntries: Entry[] = await getAllEntriesFromDB(); // Ensure type consistency
            setEntries(fetchedEntries);
        })();
    }, []);

    // Function to generate an array of days for the current month
    const getDaysArray = (year: number, month: number) => {
        const monthIndex = month; // Converts 1-based month to 0-based for the Date object
        const date = new Date(year, monthIndex, 1); // Starts at the first day of the month
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const firstDayOfWeek = date.getDay();
        let grid = Array(35).fill(-1); // Initializes all to -1 for empty

        let dayIndex = firstDayOfWeek;
        for (let day = 1; day <= daysInMonth; day++, dayIndex++) {
            grid[dayIndex] = day;
        }

        return grid;
    };

    const grid = getDaysArray(currentDate.getFullYear(), currentDate.getMonth()); // Calculate on render

    const nextMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const getEmoji = (date: number, index: number) => {
        if (date === -1) return <div key={index}></div>; // Empty cell for non-days

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        for (const entry of entries) {
            const entryDate = new Date(entry.date);
            if (entryDate.getFullYear() === currentYear &&
                entryDate.getMonth() === currentMonth &&
                entryDate.getDate() === date) {
                return (
                    <div key={entry.date} className="text-center text-[40px]">
                        {findEmojiByMood(entry.mood)}
                    </div>
                );
            }
        }

        return (
            <div key={`${date}-${index}`} className="px-4 py-3 text-center text-slate-500 border rounded-full border-gray-300">
                {date}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center my-2">
            <div className="flex gap-2 mb-4 items-center">
                <button onClick={prevMonth} className="px-2 py-2 text-3xl text-slate-400 rounded hover:text-teal-500"><IoIosArrowDropleft /></button>
                <div className="flex justify-center text-lg w-[40vw] text-slate-600 font-semibold tracking-wide">
                    {currentDate.toLocaleString('default', { month: 'short', year: 'numeric' })}
                </div>
                <button onClick={nextMonth} className="px-2 py-2 text-3xl text-slate-400 rounded hover:text-teal-500"><IoIosArrowDropright /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 gap-y-4 mt-2">
                {weekdays.map((day, index) => (
                    <div key={index} className="py-3 text-center text-slate-600 font-medium">
                        {day}
                    </div>
                ))}
                {grid.map((day, index) => getEmoji(day, index))}
            </div>
        </div>
    );
};

export default Calendar;
