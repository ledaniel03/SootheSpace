import { HeaderRow } from "../components/HeaderRow";
import LogoutButton  from "../components/LogoutButton";

const Home = () => {

  
  return (
    <div className="relative h-full flex-1 flex flex-col bg-slate-50 pt-10 gap-5">
      <HeaderRow title=""/>{" "}
      <div className="flex flex-col justify-center gap-4">

        <div className="hero mt-3">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Welcome to SootheSpace</h1>
              <p className="py-6 font-medium">Our app is still in its early beta phase, and we're excited to have you join us during this stage! Your feedback will be invaluable in helping us refine SootheSpace!</p>
            </div>
          </div>
        </div>
        
      </div>
      <LogoutButton />




    </div>
  );
};

export default Home;
