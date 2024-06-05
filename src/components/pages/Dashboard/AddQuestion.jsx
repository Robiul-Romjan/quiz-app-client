import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    const form = e.target;
    const question = form.question_title.value;
    const first_option = form.first_option.value;
    const second_option = form.second_option.value;
    const third_option = form.third_option.value;
    const fourth_option = form.fourth_option.value;
    const answer = form.correct_option.value;

    const newQuestion = {
      question,
      options: [first_option, second_option, third_option, fourth_option],
      answer,
      createdBy: user?.email,
    };

    fetch("http://localhost:5000/add-question", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "You have successfully added question",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        navigate("/dashboard/my-quizzes");
      })
      .catch(() => {
        setError("Can not add Question, Please try again");
      })
      .finally(setLoading(false));
    form.reset();
  };

  return (
    <div className="w-full md:w-5/6 mx-auto mt-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-black">
        Add Question
      </h2>
      <div className="flex items-center justify-center gap-2">
        <div className="h-1 w-36 bg-green-600"></div>
        <span className="text-red-500 font-semibold">Add Question</span>
        <div className="h-1 w-36 bg-green-600"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-12 bg-gray-100 me-12 rounded-lg mt-8 ms-8 mb-12"
      >
        <p className="text-red-500 text-center">{error}</p>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-black">
              Question Title*
            </span>
          </label>
          <input
            type="text"
            name="question_title"
            placeholder="question title"
            className="input input-bordered w-full bg-white"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-black">
                First Option*
              </span>
            </label>
            <input
              type="text"
              name="first_option"
              placeholder="type first option"
              className="input input-bordered w-full bg-white"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-black">
                Second Option*
              </span>
            </label>
            <input
              type="text"
              name="second_option"
              placeholder="type second option"
              className="input input-bordered w-full bg-white"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-black">
                Third Option*
              </span>
            </label>
            <input
              type="text"
              name="third_option"
              placeholder="type third option"
              className="input input-bordered w-full bg-white"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-black">
                Fourth Option*
              </span>
            </label>
            <input
              type="text"
              name="fourth_option"
              placeholder="type fourth option"
              className="input input-bordered w-full bg-white"
              required
            />
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-black">Answer*</span>
          </label>
          <input
            type="text"
            name="correct_option"
            placeholder="type correct option"
            className="input input-bordered w-full bg-white"
            required
          />
        </div>

        <button
          className="btn bg-green-600 hover:bg-green-800 text-white mt-5 w-full"
          type="submit"
        >
          {" "}
          {loading ? "processing" : "Add Question"}{" "}
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
