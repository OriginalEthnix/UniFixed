import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RankForm from "../components/RankForm";
import Features from "../components/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 py-20">
        <Hero />
        <RankForm />
        <Features />
      </div>

    </main>
  );
}