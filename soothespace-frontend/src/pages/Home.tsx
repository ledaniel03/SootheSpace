import React from "react";
import { HeaderRow } from "../components/HeaderRow";
import LogoutButton from "../components/LogoutButton";

const Home = () => {
  return (
    <div className="relative h-full flex-1 flex flex-col bg-slate-50 pt-10 gap-5">
      <HeaderRow title=""/>{" "}
      <div className="flex flex-col justify-center gap-4">
        <div className="hero mt-3">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Welcome to SootheSpace</h1>
              <p className="py-6 font-medium">
                Welcome to SootheSpace! Our mission is to empower you with tools that inspire mindfulness, self-reflection, and emotional well-being. We believe in nurturing a positive mindset, and we're grateful to have you join us during our beta phase. Your feedback is invaluable in helping us refine SootheSpace!
                <br /><br />
                To get the most out of SootheSpace, here’s how to effectively use our key features:
                <ul className="list-disc ml-6 mt-4">
                  <li><strong>Journaling:</strong> Reflect on your thoughts and emotions daily. Use the journaling feature to gain insights into your experiences and track your progress over time.</li>
                  <li><strong>Mood Tracking:</strong> Monitor your mood patterns and identify triggers by recording how you feel throughout the day. This can help you uncover trends and develop coping strategies.</li>
                  <li><strong>Meditation:</strong> Find your calm and center yourself with guided meditations. Choose from different techniques to relax, focus, or simply breathe.</li>
                </ul>
                <br />
                Let’s embark on this journey together towards a more mindful and balanced life. Thank you for choosing SootheSpace!
              </p>
            </div>
          </div>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Home;
