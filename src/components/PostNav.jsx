import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function({ navTab, buttons, active, search, setSearch }){


  const handleSearch = (e) => {

    setSearch(e.target.value);
  }

  return(
      <div className="posts-nav">
        <div className="flex max-w-64 w-full">
          {buttons.map((btn) => (
            <button
              onClick={() => navTab(btn.name)}
              key={btn.name}
              className={`${active === btn.name ? "border-b-2 border-blue-500 text-[#001BB7] font-semibold" : "text-gray-500 font-semibold"}`}
            >
              <p>{btn.name}</p>
              <span>{btn.count}</span>
            </button>
          ))}
        </div>

        <div className="search">
          <IoMdSearch className="absolute left-1" />
          <input type="text" name="search" value={search} onChange={handleSearch} placeholder="Search posts..." />
        </div>
      </div>
  );
}