import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { PageHeader, Spinner } from "../../components";
import { RiLockPasswordLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import dev from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contextApi/UserContext";

const UpdateProfile = () => {
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const { setAuthStateChange } = useContext(AuthContext);
  const navigate = useNavigate();

  // get user
  useEffect(() => {
    try {
      fetch(`${dev.serverUrl}/api/users/${id}`, {
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFullName(data.user.fullName);
          setUserName(data.user.userName);
          setEmail(data.user.email);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password) {
      if (password.length < 6) {
        return toast.error("Password must be atleast 6 characters");
      }
    }

    const updateInfo = {
      fullName,
    };

    const updateUserInfo = password ? { ...updateInfo, password } : updateInfo;

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(`${dev.serverUrl}/api/users/${id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUserInfo),
      });
      const updateUser = await response.json();
      if (updateUser.success) {
        toast.success(updateUser.message);
        setSubmitLoading(false);
        setShowPassword(false);
        setAuthStateChange(Math.random());
        navigate(`/profile/${id}`);
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
        title="Update Profile"
        btnText="Profile"
        icon="back"
        path={`/profile/${id}`}
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

export default UpdateProfile;
