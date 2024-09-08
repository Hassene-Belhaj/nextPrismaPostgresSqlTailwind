"use client";
import PlanItem from "./PlanItem";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Plan = () => {
  const { ref, inView } = useInView();
  const animation = useAnimation();

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
        hidden: { opacity: 0},
        visible: { opacity: 1},
      }}
      initial="hidden"
      animate={animation}
      transition={{ duration: .5, ease: "easeInOut" }}
    >
      <section>
        <h2 className="py-16 text-center text-4xl font-semibold">Choose Your Web Plan Hosting</h2>
        <div className="w-5/6 grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-auto gap-y-16 gap-x-8">
          <PlanItem />
          <PlanItem />
          <PlanItem />
        </div>
      </section>
    </motion.div>
  );
};

export default Plan;
