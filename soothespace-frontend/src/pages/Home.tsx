import React from "react";
import { HeaderRow } from "../components/HeaderRow";
import LogoutButton from "../components/LogoutButton";

/**
 * @author @ledaniel03
 * @description Presents the main landing page for SootheSpace, featuring an introduction to the platform's mission and features.
 * Includes a modal that provides detailed information on how to use various features like Chat, Journaling, Mood Tracking, and Meditation.
 * Utilizes components like `HeaderRow` and `LogoutButton` for UI consistency and functionality.
 */

const Home = () => {
  const openModal = () => {
    const modal = document.getElementById("guide_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.error(
        "The guide modal is not available or not a dialog element."
      );
    }
  };

  return (
    <div className="relative h-full flex-1 flex flex-col bg-slate-50 pt-5 gap-3">
      <HeaderRow title="" />
      <div className="flex flex-col justify-center gap-4">
        <div className="hero mt-3">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Welcome to SootheSpace</h1>
              <p className="py-6 font-medium">
                Welcome to SootheSpace! Our mission is to empower you with tools
                that inspire mindfulness, self-reflection, and emotional
                well-being. We believe in nurturing a positive mindset, and
                we're grateful to have you join us during our beta phase. Your
                feedback is invaluable in helping us refine SootheSpace!
                <br />
                {/* Modal Section */}
                <button
                  className="btn bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg rounded-lg shadow-sm w-6/12 self-center my-6"
                  onClick={openModal} // Updated to use the new handler function
                >
                  Our Features
                </button>
                <dialog id="guide_modal" className="modal">
                  <div className="modal-box font-semibold">
                    To get the most out of SootheSpace, here’s how to
                    effectively use our key features:
                    <ul className="list-disc ml-2 mt-6 space-y-4">
                      <li>
                        <strong>Chat:</strong> Engage in real-time conversations
                        with our SootheChat's mental health companion that'll
                        help you explore and articulate your feelings.
                      </li>

                      <li>
                        <strong>Journaling:</strong> Reflect on your thoughts
                        and emotions daily. Use the journaling feature to gain
                        insights into your experiences and track your progress
                        over time.
                      </li>
                      <li>
                        <strong>Mood Tracking:</strong> Monitor your mood
                        patterns and identify triggers by recording how you feel
                        throughout the day. This can help you uncover trends and
                        develop coping strategies.
                      </li>
                      <li>
                        <strong>Meditation:</strong> Find your calm and center
                        yourself with guided meditations. Choose from different
                        techniques to relax, focus, or simply breathe.
                      </li>
                    </ul>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn bg-teal-500 text-white font-bold rounded-lg shadow-sm">
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
                <br />
                {/* End of Modal Section */}
                Let’s embark on this journey together towards a more mindful and
                balanced life. Thank you for choosing SootheSpace!
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
