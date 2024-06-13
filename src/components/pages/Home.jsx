import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full mx-auto text-center mb-8 md:mt-4 flex justify-center items-center min-h-[80vh]">
      <div className="w-full">
        <h1 className="text-center my-8 text-3xl text-black font-bold">
          Welcome to Question Bank
        </h1>
        <div className="lg:w-[75%] xl:w-[70%] md:w-[90%] w-[90%] mx-auto text-left">
          <h1 className="text-md text-gray-800 text-center text-xl">
            Questions Rules:
          </h1>
          <p className="text-sm italic mt-1 mb-4 text-orange-800 text-center">
            Please read all the rules and steps before start.
          </p>
          <ul className="my-10 text-black text-[18px]">
            <li className="my-4">
              <span className="bg-orange-300 px-2 rounded">Step 1:</span> Click
              on the
              <span className="bg-green-600 text-white px-2 rounded">
                Login
              </span>
              button below.
            </li>
            <li className="my-4">
              <span className="bg-orange-300 px-2 rounded">Step 2:</span> After
              clicking Start button, you will see a page with 3s count down,
              wait until the count is over!
            </li>
            <li className="my-4">
              <span className="bg-orange-300 px-2 rounded">Step 3:</span> You
              will see the questions with 4 options for each, and counter will
              start and which will count your exam time.
            </li>
            <li className="my-4">
              <span className="bg-orange-300 px-2 rounded">Step 4:</span> You
              have to select the correct answer, and you have 10 seconds to
              answer each questions.
            </li>
            <li className="my-4">
              <span className="bg-orange-300 px-2 rounded">Step 5:</span> Click
              on the Show Results button, when you are done with all the
              answers. Then you show your quiz results.
            </li>
          </ul>
        </div>

        <Link
          to={"/dashboard/exams"}
          className="bg-green-600 px-20 py-2 text-white rounded font-semibold"
        >
          Attend Exam
        </Link>
      </div>
    </div>
  );
};

export default Home;
