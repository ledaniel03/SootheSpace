import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faCommentDots, faPenToSquare, faHardDrive, faHandshake } from "@fortawesome/free-regular-svg-icons"; // Regular icons | (Find a toolbox or backpack elsewhere!)
import { faHouseUser } from "@fortawesome/free-solid-svg-icons"; // Solid icons | (Find a regular house icon!! None on FA website for free)
import { Link } from "react-router-dom";

// add remaining routes/links to the other btns
// add active to change color of btns
// navbar adjustments for PC too? Can use observer and redraw another navbar for larger screens 500 width< (Decide later- are we just doing mobile?)

function Navbar() {
  return (
    
    <div className="btm-nav bg-violet-50">
        <Link to="/">
            <button className="active text-violet-900 flex flex-col items-center">
                <FontAwesomeIcon icon={faHospital} className="icon" />
                <span className="btm-nav-label">Home</span> 
            </button>
        </Link> 

      <button className= "text-violet-500">
        <FontAwesomeIcon icon={faCommentDots} className="icon" />
        <span className="btm-nav-label">Chat</span>
      </button>

      <Link to="/journal">
        <button className=" text-violet-500">
            <FontAwesomeIcon icon={faPenToSquare} className="icon" />
            <span className="btm-nav-label">Journal</span>
        </button>
      </Link>

      <button className=" text-violet-500">
        <FontAwesomeIcon icon={faHardDrive} className="icon" />
        <span className="btm-nav-label">Toolbox</span>
      </button>

      <button className=" text-violet-500">
        <FontAwesomeIcon icon={faHandshake} className="icon" />
        <span className="btm-nav-label">Resources</span>
      </button>
      
    </div>
  );
}

export default Navbar;
