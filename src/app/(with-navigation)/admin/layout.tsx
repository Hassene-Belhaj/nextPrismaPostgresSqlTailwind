import Aside from "@/components/Aside";
import AnimationWrapper from "@/utils/AnimationWrapper";

interface Ichildren {
  children: React.ReactNode;
}

const layout = ({ children }: Ichildren) => {
  return (
    <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: "easeInOut" }} exit={{ opacity: 0 }}>
      <section className="min-h-screen max-h-full w-full pt-16 flex mx-auto">
        <Aside />
        <div className="flex-1 p-4 bg-slate-200">{children}</div>
      </section>
    </AnimationWrapper>
  );
};

export default layout;
