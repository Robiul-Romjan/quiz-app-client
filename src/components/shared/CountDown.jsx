// eslint-disable-next-line react/prop-types
const CountDown = ({countdown}) => {
  return (
    <div
      className="fixed top-0 left-0 bg-zinc-900 bg-opacity-90 w-full h-[100vh] justify-center items-center z-20"
      id="countDownContainer"
    >
      <div className="text-center flex flex-col items-center justify-center h-[100vh]">
        <h1 className="text-gray-200 text-3xl mb-5">
          <span id="counter">{countdown}</span>s
        </h1>
        <h1 className="text-gray-200 text-xl animate-pulse">
          Stay Seated, Stay Sharp. Starting Quiz In a moment!
        </h1>
      </div>
    </div>
  );
};

export default CountDown;
