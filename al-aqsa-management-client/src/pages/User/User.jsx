import { useEffect, useState } from "react";
import { PageHeader } from "../../components";
import UserTable from "./UserTable";
import dev from "../../config";
import toast from "react-hot-toast";
const User = () => {
  const [getData, setGetData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    try {
      fetch(
        `${dev.serverUrl}/api/users?search=${search}&limit=${limit}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => setGetData(data));
    } catch (error) {
      toast.error(error.message);
    }
  }, [search, page, limit]);

  return (
    <div>
      <PageHeader
        title="All Users"
        btnText="Add User"
        path="/add-user"
        icon="add"
      />
      <UserTable
        data={getData}
        filter={{ search, setSearch, setPage, limit, setLimit }}
      />
    </div>
  );
};

export default User;
