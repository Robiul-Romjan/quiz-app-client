/* eslint-disable react/prop-types */
import { useState } from "react";

const QuizCard = ({ quiz, index, handleScoreUpdate }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const correct = option === quiz.answer;
    handleScoreUpdate(correct, option);
  };

  return (
    <div className="m-3 py-3 px-4 shadow-sm rounded mt-12">
      <div className="flex items-center">
        <div className="h-8 w-8 bg-green-400 rounded-full flex justify-center items-center text-green-800 mr-3">
          {index}
        </div>
        <p className="text-gray-800 text-lg font-semibold">{quiz?.question}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        {quiz?.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(option)}
            className={`border text-lg rounded text-black p-2 cursor-pointer hover:bg-green-200 transition-all ${
              selectedOption === option ? "bg-green-100" : ""
            }`}
          >
            <p className="text-[10px] mb-1">{option}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
