import { FadeLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="h-[100vh] flex justify-center items-center">
            <FadeLoader size={80} color="green" />
        </div>
    );
};

export default Loader;