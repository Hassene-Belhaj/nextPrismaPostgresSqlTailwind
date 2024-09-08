import Hero from "@/components/home/Hero";
import Plan from "@/components/home/Plan";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh_-_64px)] max-h-full">
      <Hero order={"order-0"} imageSrc={"/banner1.png"} />
      <Hero order={"order-1"} imageSrc={"/banner2.png"} />
      <Plan />  
      <Hero order={"order-0"} imageSrc={"/banner1.png"} />
      <Hero order={"order-1"} imageSrc={"/banner2.png"} />
    </main>
  );
}
