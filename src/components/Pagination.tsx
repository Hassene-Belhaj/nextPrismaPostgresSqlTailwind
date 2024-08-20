"use client";

import Link from "next/link";

interface IpaginationProps {
  page: number;
  NbrOfPages: number;
  route: string;
}

const Pagination = ({ page, NbrOfPages, route }: IpaginationProps) => {
  let Array: number[] = [];

  for (let i = 1; i <= NbrOfPages; i++) {
    Array.push(i);
  }

  const prev = page === 1 ? Array.length : page - 1 ; 
  const next = page === Array.length ? 1 : page + 1 ;

  return (
    <section className="w-full p-24">
      <div className="w-full justify-center flex gap-[2px]">
        <Link href={`${route}?page=${prev}`}>
          <button className="border-2 border-gray-800 w-16 h-8">Prev</button>
        </Link>

        {Array.map((page, i) => {
          return (
            <div key={i}>
              <Link href={`${route}?page=${page}`}>
                <button className="border-2 border-gray-800 w-8 h-8">{page}</button>
              </Link>
            </div>
          );

        })}
        <Link href={`${route}?page=${next}`}>
          <button className="border-2 border-gray-800 w-16 h-8">Next</button>
        </Link>
      </div>
    </section>
  );
};

export default Pagination;
