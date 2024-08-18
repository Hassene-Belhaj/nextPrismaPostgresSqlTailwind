import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh_-_160px)] max-h-full">
      <section className="flex xs:flex-col lg:flex-row flex-row justify-center items-center">
        <div className="flex-1 p-8">
          <h2 className="text-3xl py-4">Cloud Hosting</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores omnis similique quia fuga quaerat voluptatibus libero veniam dicta a. Cum exercitationem, molestias rerum iste veritatis corporis ipsum suscipit cupiditate laborum voluptatibus facilis nulla alias sit officia est fuga quia at cumque! Cumque et quia eaque suscipit quae fugiat corrupti harum!</p>
        </div>
        <div className="flex-1 m-auto">
          <Image src={'/banner.png'} alt='banner image' width={800} height={800} ></Image>
        </div>
      </section>
    </main>
  );
}
