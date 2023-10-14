import { ErrorImg } from "../../assets";

const Error = () => {
  return (
    <div className="bg-[#1C2434] text-[#C6CCB8] min-h-screen flex items-center justify-center">
      <div>
        <img src={ErrorImg} alt="Error" className="w-[200px]" />
        <h2 className="text-center text-2xl mt-3">Page No Found</h2>
      </div>
    </div>
  );
};

export default Error;
