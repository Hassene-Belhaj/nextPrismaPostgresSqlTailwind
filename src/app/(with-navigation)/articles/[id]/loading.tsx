import ArticleSingleSkeleton from "@/components/ArticleSingleSkeleton";

const loading = () => {
  return (
    <section className="min-h-[calc(100vh_-_64px)] max-h-full">
      <ArticleSingleSkeleton />
    </section>
  );
};

export default loading;
