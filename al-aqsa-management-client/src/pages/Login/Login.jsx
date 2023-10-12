import { Link } from "react-router-dom";
import { Logo } from "../../assets";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="bg-[#1C2434] min-h-screen flex items-center justify-center">
      <div className="md:w-[385px] w-full mx-5 bg-white px-5 pb-5 pt-2 rounded shadow-2xl relative">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" className="w-[140px]" />
        </div>
        <form>
          {/* User Name Start */}
          <div className="relative mb-5">
            <input
              type="text"
              className="py-3 pr-4 pl-16 block w-full border border-gray-300 shadow-sm rounded-md outline-none"
              placeholder="Username"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 px-4 bg-gray-800 text-[#C6CCD7] text-xl rounded-l-md">
              <AiOutlineUser />
            </div>
          </div>
          {/* User Name End */}

          {/* Password Start */}
          <div className="relative mb-5">
            <input
              type={showPassword ? "text" : "password"}
              className="py-3 pr-4 pl-16 block w-full border border-gray-300 shadow-sm rounded-md outline-none"
              placeholder="Password"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 px-4 bg-gray-800 text-[#C6CCD7] text-xl rounded-l-md">
              <RiLockPasswordLine />
            </div>
          </div>
          {/* Password End */}

          <div className="flex items-center justify-between">
            <div>
              <input
                type="checkbox"
                id="show-pass"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-pass" className="pl-2">
                Show Password
              </label>
            </div>
            <div>
              <Link to={"/"}>
                <em>Forgot Password?</em>
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#1C2434] text-[#C6CCD7] py-3 font-semibold rounded-md mt-7"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
