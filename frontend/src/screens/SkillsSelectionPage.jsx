import Select from "react-select";
import makeAnimated from "react-select/animated";
import data from "../../utils/data";
import { useState } from "react";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const options = data.map((el) => ({ value: el, label: el }));
const difficultyOptions = [
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "Expert",
    label: "Expert",
  },
];

const animatedComponents = makeAnimated();

const SkillsSelectionPage = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [chosen, setChosen] = useState(false);
  const { setSkills } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const shouldContinue = confirm(
      selectedSkills.length > 0
        ? "Wish to continue"
        : "You have no selected skill, wish to continue"
    );

    if (!shouldContinue) return;
    setSkills(selectedSkills);
    setChosen(true);
  };

  if (!chosen) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Select Skills you wish to learn
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            options={options}
            value={selectedSkills}
            onChange={(e) => {
              setSelectedSkills(e);
            }}
          />
          <div className="mt-10">
            <button
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (chosen) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Select your difficulty level:
          </h2>
        </div>

        <form
          onSubmit={() => navigate("/app")}
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
        >
          {selectedSkills.map((el, i) => (
            <div className="flex flex-col gap-2 mb-3" key={i}>
              <span>{el.label}:</span>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                isMulti
                options={difficultyOptions}
                required
              />
            </div>
          ))}
          <div className="mt-10">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default SkillsSelectionPage;
