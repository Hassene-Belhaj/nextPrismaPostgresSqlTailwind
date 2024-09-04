import Aside from "@/components/Aside";
import AnimationWrapper from "@/utils/AnimationWrapper";

interface Ichildren {
  children: React.ReactNode;
}

const layout = ({ children }: Ichildren) => {
  return (
    <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: "easeInOut" }} exit={{ opacity: 0 }}>
      <section className="w-full min-h-[calc(100vh_-_64px)] max-h-full flex mx-auto pt-[80px]">
          <Aside />
          <div className="flex-1 py-8 px-4">{children}</div>
      </section>
    </AnimationWrapper>
  );
};

export default layout;
