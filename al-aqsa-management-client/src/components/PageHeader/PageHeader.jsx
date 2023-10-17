import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../contextApi/UserContext";

const PageHeader = ({ title, btnText, path, icon, custom }) => {
  const { user } = useContext(AuthContext);
  const access =
    user.role === "Super Admin" ||
    user.role === "Admin" ||
    user.role === "Editor" ||
    custom;

  return (
    <div className="bg-white p-5 mb-6 rounded-md shadow flex items-center justify-between">
      <h2 className="font-semibold text-2xl">{title}</h2>
      {access && (
        <Link to={path}>
          <button className="bg-[#1C2434] text-[#C6CCD7] py-3 px-5 rounded-md flex items-center justify-between gap-2">
            {icon === "add" ? <AiOutlinePlus /> : <BiArrowBack />}
            <span className="sm:block hidden">{btnText}</span>
          </button>
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
