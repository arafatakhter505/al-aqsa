import { CirclesWithBar } from "react-loader-spinner";

const PreLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1C2434]">
      <CirclesWithBar
        height="200"
        width="200"
        color="#C6CCD7"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};

export default PreLoader;
