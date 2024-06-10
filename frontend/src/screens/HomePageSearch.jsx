import { useEffect, useState } from "react";
import CoursesList from "../components/coursesList";
import { getCoursesByTitle } from "../../utils/supabaseLoginFns";
import "ldrs/hourglass";

const HomePageSearch = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const fetchedCourses = await getCoursesByTitle(searchText);
    console.log(fetchedCourses);
    setCourses(fetchedCourses);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <div className="w-1/2">
        <div className=" flex items-center justify-between  w-full border border-black rounded-lg px-5 py-1">
          <input
            type="text"
            className="placeholder-slate-700 w-10/12 py-3 outline-none"
            placeholder="Search for courses..."
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <button
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="py-5">
          <l-hourglass
            size="50"
            bg-opacity="0.1"
            speed="1.75"
            color="black"
          ></l-hourglass>
        </div>
      )}
      {!isLoading && <CoursesList courses={courses} />}
    </div>
  );
};

export default HomePageSearch;
