import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { PageHeader, Spinner } from "../../components";
import { RiArrowDropDownLine, RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { toast } from "react-hot-toast";
import dev from "../../config";

const AddUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const userNamePattern = /^[a-zA-Z0-9_]+$/;

  // user name validation
  const userNameValidation = () => {
    if (userName.length < 3 || userName.length > 20) {
      return setUserNameError("Username must be 3 to 20 characters long");
    } else if (!userNamePattern.test(userName)) {
      return setUserNameError(
        "Username can only contain letters, numbers, and underscores"
      );
    } else {
      setUserNameError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // check password
    if (password !== confirmPassword)
      return toast.error("Password does not match");
    if (password.length < 6) {
      return toast.error("Password must be atleast 6 characters");
    }

    const user = {
      fullName,
      userName,
      email,
      password,
      role,
    };

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(`${dev.serverUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const createUser = await response.json();
      if (createUser.success) {
        toast.success(createUser.message);
        setSubmitLoading(false);
        setFullName("");
        setUserName("");
        setEmail("");
        setRole("viewer");
        setPassword("");
        setConfirmPassword("");
        setShowPassword(false);
      } else {
        setSubmitLoading(false);
        toast.error(createUser.message);
      }
    } catch (error) {
      setSubmitLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <PageHeader
        title="Add New User"
        btnText="All Users"
        icon="back"
        path="/user"
      />
      <div className="rounded-md border bg-white shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex items-start justify-between md:flex-nowrap flex-wrap gap-6">
            <div className="w-full">
              <label className="mb-2.5 block text-black">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <AiOutlineUser />
                </span>
              </div>
            </div>

            <div className="w-full">
              <label className="mb-2.5 block text-black">User Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter user name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={userNameValidation}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <AiOutlineUser />
                </span>
              </div>
              {userNameError && <p className="text-red-500">{userNameError}</p>}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between md:flex-nowrap flex-wrap gap-6">
            <div className="w-full">
              <label className="mb-2.5 block text-black">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <AiOutlineMail />
                </span>
              </div>
            </div>

            <div className="w-full">
              <label className="mb-2.5 block text-black">User Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="relative z-20 w-full appearance-none rounded border bg-transparent py-4 px-6 outline-none transition focus:border-primary active:border-primary"
                  required
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <RiArrowDropDownLine />
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between md:flex-nowrap flex-wrap gap-6">
            <div className="w-full">
              <label className="mb-2.5 block text-black">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <RiLockPasswordLine />
                </span>
              </div>
            </div>

            <div className="w-full">
              <label className="mb-2.5 block text-black">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <RiLockPasswordLine />
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:flex-nowrap flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password">Show Password</label>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#1C2434] text-[#C6CCD7] font-semibold px-6 py-3 rounded-md"
                disabled={submitLoading}
              >
                {submitLoading ? <Spinner /> : "Add User"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
