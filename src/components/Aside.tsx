"use client";

import React from "react";
import { MdDashboard } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import { FaComment } from "react-icons/fa";
import Link from "next/link";

const Aside = () => {
  return (
    <aside className="flex-none md:w-1/4 py-16 px-2 border-r-2 bg-indigo-50 flex flex-col gap-16">
      <Link href="/admin">
        <div className="flex justify-start items-center gap-2">
          <MdDashboard size={40} />
          <h2 className="text-xl sx:hidden sm:hidden md:block">DashBoard</h2>
        </div>
      </Link>
      <Link href="/admin/articles_table">
        <div className="flex justify-start items-center gap-2">
          <RiArticleLine size={40} />
          <h2 className="text-xl sx:hidden sm:hidden md:block">Articles</h2>
        </div>
      </Link>
      <Link href="/admin/comments_table">
        <div className="flex justify-start items-center gap-2">
          <FaComment size={40} />
          <h2 className="text-xl sx:hidden sm:hidden md:block">Comments</h2>
        </div>
      </Link>
    </aside>
  );
};

export default Aside;
