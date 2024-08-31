

const ArticlesSkeleton = () => {
  return (
      <section className="min-h-[calc(100vh_-_160px)] max-h-full">
        <div className="mt-4 p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {new Array(6).fill(0).map((_item, index) => {
            return (
              <div key={index} className="h-[220px] p-4 bg-slate-100 flex flex-col gap-2 rounded-lg shadow-md">
                <div className="h-16 text-md font-semibold flex flex-col gap-4">
                  <h3 className="h-4 w-full bg-slate-200 rounded-md"></h3>
                  <h3 className="h-4 w-3/4 bg-slate-200 rounded-md"></h3>
                </div>
                <div className="mt-4 h-18 text-sm flex flex-col gap-4">
                  <p className="h-4 w-full bg-slate-200 rounded-md"></p>
                  <p className="h-4 w-full bg-slate-200 rounded-md"></p>
                </div>
                <div className="h-24 flex justify-end items-end">
                  <div className="xs:w-full sm:w-1/2">
                    <button className="w-full h-10 bg-slate-200 text-white rounded-full"></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
  );
};

export default ArticlesSkeleton;
