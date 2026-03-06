import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { NowShowing } from "./components/NowShowing";
import { Upcoming } from "./components/Upcoming";
import { About } from "./components/About";
import { Reviews } from "./components/Reviews";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white antialiased">
      <Navbar />
      <Hero />
      <NowShowing />
      <Upcoming />
      <About />
      <Reviews />
      <Newsletter />
      <Footer />
    </div>
  );
}
