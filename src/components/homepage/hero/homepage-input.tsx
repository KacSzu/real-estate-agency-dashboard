"use client";
import { CiLocationOn, CiSearch } from "react-icons/ci";

function HomepageInput() {
  return (
    <div className="bg-white px-3 py-2 rounded-full shadow-2xl ">
      <div className="bg-muted rounded-full flex items-center gap-2 ">
        <span className="text-lg sm:text-xl lg:text-2xl text-black p-2">
          <CiLocationOn />
        </span>
        <input
          className="rounded-full bg-muted placeholder:text-xs sm:placeholder:text-sm text-black focus:ring-0 focus:outline-none focus:border-transparent py-2 px-1 sm:w-[200px]"
          placeholder="What city do you want to live?"
        />
        <button
          disabled
          className="bg-emerald-500 p-2 rounded-full text-lg sm:text-xl lg:text-2xl disabled:cursor-not-allowed"
        >
          <CiSearch />
        </button>
      </div>
    </div>
  );
}

export default HomepageInput;
