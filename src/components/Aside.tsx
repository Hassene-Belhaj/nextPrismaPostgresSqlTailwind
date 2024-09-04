"use client";

import React from "react";
import { MdDashboard } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import { FaComment } from "react-icons/fa";
import Link from "next/link";

const Aside = () => {
  return (
    <aside className="flex-none md:w-1/6 px-2 py-8 border-2 bg-gray-100 flex flex-col gap-16">

      <Link href="/admin">
        <div className="flex justify-start items-center gap-2">
          <MdDashboard size={30} />
          <h2 className="text-lg xs:hidden sm:hidden md:block">DashBoard</h2>
        </div>
      </Link>

      <Link href="/admin/articles_table">
        <div className="flex justify-start items-center gap-2">
          <RiArticleLine size={30} />
          <h2 className="text-lg xs:hidden sm:hidden md:block">Articles</h2>
        </div>
      </Link>

      <Link href="/admin/comments_table">
        <div className="flex justify-start items-center gap-2">
          <FaComment size={30} />
          <h2 className="text-lg xs:hidden sm:hidden md:block">Comments</h2>
        </div>
      </Link>

    </aside>
  );
};

export default Aside;
