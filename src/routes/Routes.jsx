import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import QuizPage from "../components/pages/QuizPage";
import SignUp from "../components/pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../components/pages/Dashboard/Profile";
import AddQuestion from "../components/pages/Dashboard/AddQuestion";
import ManageUsers from "../components/pages/Dashboard/ManageUsers";
import QuizResults from "../components/pages/Dashboard/QuizResults";
import ManageQuiz from "../components/pages/Dashboard/ManageQuiz";
import MyQuizzes from "../components/pages/Dashboard/MyQuizzes";
import Exams from "../components/pages/Dashboard/Exams";
import Students from "../components/pages/Dashboard/Students";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/quiz/:category",
            element: <PrivateRoute><QuizPage /></PrivateRoute>,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
          },
        ],
      },
    {
      path: "/dashboard",
      element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
      children: [
        {
          path: "/dashboard",
          element: <Profile />
        },
        {
          path: "/dashboard/add-question",
          element: <AddQuestion />
        },
        {
          path: "/dashboard/my-quizzes",
          element: <MyQuizzes />
        },
        {
          path: "/dashboard/manage-users",
          element: <ManageUsers />
        },
        {
          path: "/dashboard/manage-quiz",
          element: <ManageQuiz />
        },
        {
          path: "/dashboard/quiz-results",
          element: <QuizResults />
        },
        {
          path: "/dashboard/exams",
          element: <Exams />
        },
        {
          path: "/dashboard/students",
          element: <Students />
        },
      ]
    }
  ]);