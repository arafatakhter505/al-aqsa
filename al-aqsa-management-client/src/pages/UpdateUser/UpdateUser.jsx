import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { PageHeader, Spinner } from "../../components";
import { RiArrowDropDownLine, RiLockPasswordLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import dev from "../../config";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  // get user
  useEffect(() => {
    try {
      fetch(`${dev.serverUrl}/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  // set user info
  useEffect(() => {
    setFullName(user?.fullName);
    setUserName(user?.userName);
    setEmail(user?.email);
    setRole(user?.role);
    setStatus(user?.isBlocked);
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password) {
      if (password.length < 6) {
        return toast.error("Password must be atleast 6 characters");
      }
    }

    const updateInfo = {
      fullName,
      role,
      isBlocked: status,
    };

    const updateUserInfo = password ? { ...updateInfo, password } : updateInfo;

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(`${dev.serverUrl}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUserInfo),
      });
      const updateUser = await response.json();
      if (updateUser.success) {
        toast.success(updateUser.message);
        setSubmitLoading(false);
        setShowPassword(false);
        navigate("/user");
      } else {
        setSubmitLoading(false);
        toast.error(updateUser.message);
      }
    } catch (error) {
      setSubmitLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <PageHeader
        title="Update User"
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
                  readOnly
                  className="w-full rounded-lg border bg-gray-100 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <AiOutlineUser />
                </span>
              </div>
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
                  readOnly
                  className="w-full rounded-lg border bg-gray-100 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
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
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <RiLockPasswordLine />
                </span>
              </div>
            </div>

            <div className="w-full">
              <label className="mb-2.5 block text-black">User Status</label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="relative z-20 w-full appearance-none rounded border bg-transparent py-4 px-6 outline-none transition focus:border-primary active:border-primary"
                  required
                >
                  <option value={false}>Active</option>
                  <option value={true}>Block</option>
                </select>

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <RiArrowDropDownLine />
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
                {submitLoading ? <Spinner /> : "Update User"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
