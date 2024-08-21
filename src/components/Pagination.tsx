"use client";

import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  const prev = page === 1 ? Array.length : page - 1;
  const next = page === Array.length ? 1 : page + 1;

  return (
    <section className="w-full p-24">
      <div className="w-full justify-center flex gap-[4px]">
        <Link href={`${route}?page=${prev}`}>
          <button className="w-16 h-8 px-2 flex  justify-end items-center relative hover:bg-slate-100 rounded-lg font-semibold text-sm">
            <FaChevronLeft size={10} className="absolute left-[2px] top-1/2 -translate-y-1/2" />
            Prev
          </button>
        </Link>

        {Array.map((pageNbr, i) => {
          return (
            <div key={i} className={`${pageNbr === page ? "bg-slate-200 rounded-lg" : null}`}>
              <Link href={`${route}?page=${pageNbr}`}>
                <button className="border-none w-8 h-8">{pageNbr}</button>
              </Link>
            </div>
          );
        })}
        <Link href={`${route}?page=${next}`}>
          <button className="w-16 h-8 px-2 flex justify-start items-center relative hover:bg-slate-100 rounded-lg font-semibold text-sm">
            <FaChevronRight size={10} className="absolute right-[2px] top-1/2 -translate-y-1/2" />
            Next
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Pagination;
