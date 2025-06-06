import { GradientBackground } from "./components/GradientBackground";
import Navbar from "./components/Nav";
import Landing from "./landing";
export default function Home() {
  return (
    
   
     <GradientBackground>
     <div className="p-4 min-h-screen py-8" >
     <Navbar/>
     <Landing/>
     </div>
     </GradientBackground>
    
   
  );
}
