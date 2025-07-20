import Subscribe from "./BetaProgram/Subscribe";
import HeroSection from "./BetaProgram/HeroSection";
import Navbar from "./BetaProgram/Navbar"
import FAQSection from "./BetaProgram/FAQ";

function Beta(){
  return (
    <div className="">
      <div id = "home" className= "bg-[#0D0D0D]">
        <Navbar />
        <HeroSection />
      </div>
      <div>
        <Subscribe />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
    </div>
  );
}

export default Beta