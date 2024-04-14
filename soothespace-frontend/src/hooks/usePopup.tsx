import { useState } from "react";

/*
    Black box component that handles popup visibility and content.
    useState to set when we display the component or not, & onClick={(e) => setOpen(false)} to close the popup when clicked outside.
*/

export const usePopup = (element: any) => {
  const [open, setOpen] = useState(false);

  let comp = undefined;
  if (open) {
    comp = (
      <div
        className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-[rgba(45,45,46,0.8)] "
        onClick={(e) => setOpen(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>{element}</div>
      </div>
    );
  }

  return { open, setOpen, comp };
};
