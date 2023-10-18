import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dev from "../../config";
import { UserImg } from "../../assets";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`${dev.serverUrl}/api/users/${id}`, {
      headers: { authorization: `Bearer ${dev.jwt}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div className="flex justify-center">
      <div className="min-w-[300px] bg-white shadow rounded-md">
        <div className="flex justify-center p-5">
          <img
            src={UserImg}
            alt="user"
            className="w-[100px] border-2 rounded-full"
          />
        </div>
        <div className="p-5 border-b-2">
          <h2 className="text-xl font-semibold">{user?.fullName}</h2>
        </div>
        <div className="p-5">
          <p>Username: {user?.userName}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <Link to={`/update-profile/${user?._id}`}>
            <button className="bg-[#1C2434] text-[#C6CCD7] w-full font-semibold mt-5 px-4 py-2 rounded-md">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
