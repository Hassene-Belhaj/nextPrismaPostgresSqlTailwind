import MainSection from "@/components/MainSection";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh_-_160px)] max-h-full">
      <MainSection order={"order-0"} imageSrc={"/banner1.png"} />
      <MainSection order={"order-1"} imageSrc={"/banner2.png"} />
    </main>
  );
}
