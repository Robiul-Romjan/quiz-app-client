import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true)
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name)
          .then(() => {
            // navigate("/");
            const savedUser = {
              name: data.name,
              email: data.email,
              department: data.department,
              role: data.role,
              id: data.id,
            };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(savedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    title: 'Success!',
                    text: 'You have successfully registered',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                  navigate("/")
                  setLoading(false)
                }
              });
          })
          .catch((error) => setError(error.message))
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen sm:py-12 mt-12 md:mt-4">
      <div className="border-2 border-green-500 flex flex-col max-w-md md:max-w-[45%] p-6 rounded-md sm:p-5 w-full bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-500 font-semibold">Welcome to our quiz bank</p>
        </div>
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold"
              >
                Your ID
              </label>
              <input
                {...register("id", { required: true })}
                type="number"
                name="id"
                required
                placeholder="Enter Your ID Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold"
              >
                Your Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                name="name"
                required
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>

            <div>
              <label className="font-semibold" htmlFor="department">
                Your Department :{" "}
              </label>
              <select
                {...register("department", { required: true })}
                className="bg-white"
                name="department"
                required
              >
                <option value="cse">CSE</option>
                <option value="cse">BBA</option>
                <option value="cse">EEE</option>
              </select>
            </div>
            <div>
              <label className="font-semibold" htmlFor="role">
                Registration For :{" "}
              </label>
              <select
                {...register("role", { required: true })}
                className="bg-white"
                name="role"
                required
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold"
              >
                Email address
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div className="relative">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="text-sm mb-2 font-semibold"
                >
                  Password
                </label>

                {errors.password?.type === "minLength" && (
                  <p className="text-red-400 text-sm">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-400 text-sm">
                    Must have one letter and number.
                  </p>
                )}
              </div>
              <input
                // onChange={(e) => setPassword(e.target.value)}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[a-z])(.*[0-9])/,
                })}
                type={`${show ? "password" : "text"}`}
                name="password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
              />
              <span
                onClick={() => setShow(!show)}
                className="cursor-pointer absolute right-0 top-1/2 mt-2 me-4"
              >
                {" "}
                {show ? <FaEyeSlash /> : <FaEye />}{" "}
              </span>
            </div>
          </div>

          <div>
            <button
            disabled={loading? true : false}
              type="submit"
              className="bg-green-500 hover:bg-green-700 transition-all w-full rounded-md py-3 text-white"
            >
              {loading ? "Processing" : "Sign Up"}
              
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
            {/* Error will be show here */}
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-500">
            Sign Up with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-500 font-semibold">
          Have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-green-500 text-gray-600 font-semibold"
          >
            Log In
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
