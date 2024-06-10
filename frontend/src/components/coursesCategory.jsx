import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCoursesBySkills } from "../../utils/supabaseLoginFns";
import "ldrs/hourglass";

const CoursesCategory = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [coursesList, setCourses] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const courseSlice = showMore ? coursesList?.length : 6;

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true);
      const courses = await getCoursesBySkills(item);
      setCourses(courses);
      setIsLoading(false);
    };
    getCourses();
  }, [item]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h2 className="text-2xl font-bold text-gray-900">{item}</h2>
        {isLoading && (
          <div className="flex justify-center items-center py-5">
            <l-hourglass
              size="50"
              bg-opacity="0.1"
              speed="1.75"
              color="black"
            ></l-hourglass>
          </div>
        )}

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {!isLoading &&
            Boolean(coursesList.length) &&
            coursesList.slice(0, courseSlice).map((course, index) => (
              <div key={course.id} className="group relative mb-5">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={
                      index % 3 == 0
                        ? "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        : index % 2 == 0
                        ? "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        : "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={""}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link to={`/courses/${course.id}`}>
                    <span className="absolute inset-0" />
                    {course.Organization}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {course.Title} ({course.Difficulty})
                </p>
              </div>
            ))}
          {!coursesList.length && !isLoading && (
            <p className="text-lg">No course found!</p>
          )}
        </div>
      </div>
      {!isLoading && coursesList.length > 6 && !showMore ? (
        <p className="mt-10 text-center text-md text-gray-500">
          See more{" "}
          <button
            onClick={() => setShowMore(true)}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {item} courses
          </button>
        </p>
      ) : null}
    </div>
  );
};

export default CoursesCategory;
