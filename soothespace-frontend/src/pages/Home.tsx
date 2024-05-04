import React from "react";
import { HeaderRow } from "../components/HeaderRow";
import LogoutButton  from "../components/LogoutButton";

const Home = () => {
  return (
    <div className="relative h-full flex-1 flex flex-col bg-slate-50 pt-10 gap-5">
      <HeaderRow title="Home"/>{" "}
      <div className="flex flex-col justify-center gap-4">
                <div className="text-black font-bold text-md font-sans ml-5">Insights</div>
      </div>
      <LogoutButton />




    </div>
  );
};

export default Home;
