import { useUserContext } from "../../context/userContext";
import CoursesCategory from "../components/coursesCategory";
import InterestedInCategory from "../components/interestedInCategory";

const HomePageDashboard = () => {
  const { skills, interestedIn } = useUserContext();

  let userSkills = skills.map((el) => el.value);

  return (
    <div>
      {userSkills.map((el, i) => (
        <CoursesCategory key={i} item={el} />
      ))}
      {interestedIn.length
        ? interestedIn.map((el, i) => (
            <InterestedInCategory key={i} title={el} />
          ))
        : null}
    </div>
  );
};

export default HomePageDashboard;
