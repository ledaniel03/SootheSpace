import { useState } from "react";

/**
 * @author @ledaniel03
 * @description A custom hook managing the visibility of a modal or popup component. It controls whether
 * the popup is open and handles its display logic, including closing the popup when clicking outside its content.
 * @param element The React component or JSX to render inside the popup.
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
