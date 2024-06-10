import { useEffect, useState } from "react";
import { getCourseById } from "../../utils/supabaseLoginFns";
import { useNavigate, useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import Loader from "../components/loader";
import { useUserContext } from "../../context/userContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setInterestedIn } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const data = await getCourseById(id);
        console.log(data);
        setCourse(data[0]);
      } catch (e) {
        alert("Error fetching course");
        throw new Error("Error fetching error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (isLoading) return <Loader isLoading={isLoading} />;

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <a
                href={course.course_url}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {course.Title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-xl sm:px-6 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:px-8 h-1/4">
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={
                id % 3 === 0
                  ? "https://plus.unsplash.com/premium_photo-1683135219860-44ad80fc9bb7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : id % 2 === 0
                  ? "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : "https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {course.Title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Course information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {course.Organization}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        course.Ratings > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{course.Ratings} out of 5 stars</p>
                <a
                  href={course.course_url}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {course["Review Count"]} reviews
                </a>
              </div>
            </div>
            <a
              href={course.course_url}
              target="no_blank"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                setInterestedIn((state) => [...state, course.Title]);
                navigate("/app");
              }}
            >
              Check Out
            </a>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {course.course_description}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  Difficulty: {course.Difficulty} Course
                </p>
                <p className="text-sm text-gray-600">
                  Students enrolled: {course.course_students_enrolled} students
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
