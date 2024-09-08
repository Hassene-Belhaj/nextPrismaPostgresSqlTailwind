"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Hero = ({ order, imageSrc }: { order: string; imageSrc: string }) => {
  const animation = useAnimation();
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      animation.start("visible");
    } else {
      animation.start("hidden");
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0  },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate={animation}
      transition={{
        duration: .5 ,
        ease : "easeInOut"
      }}
    >
        <section className="py-16 px-16 flex xs:flex-col lg:flex-row flex-row justify-center items-center gap-8">
          <div className={`flex-1 p-4 ${order}`}>
            <h2 className="text-6xl font-bold py-8">Lorem Ipsum</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae consequuntur dolore, recusandae voluptate praesentium obcaecati, exercitationem et vel laboriosam voluptatibus assumenda? Neque accusamus molestias quod ut illum est alias rerum tempore iusto eius quia ratione
              dignissimos deleniti vel harum consectetur aperiam ullam consequatur iste, provident magni? Voluptate, cupiditate quia? Laborum ipsum incidunt tenetur, soluta inventore unde, nostrum recusandae corrupti facere aperiam doloremque voluptatem atque laudantium illo beatae id ab ea
              nesciunt. Nihil quae, doloremque numquam aliquid, dolor, error aspernatur tenetur doloribus eveniet reiciendis magni non sint est minima asperiores eos cupiditate aperiam earum autem? Consectetur atque facilis blanditiis nostrum veritatis!
            </p>
          </div>
          <div className="flex-1 relative rounded-2xl overflow-hidden">
            {/* <div className="absolute inset-0 bg-black/50"></div> */}
            <Image src={imageSrc} alt="banner image" width={500} height={300} priority style={{ width: "100%", height: "auto" }} />
          </div>
        </section>
    </motion.div>
  );
};

export default Hero;
