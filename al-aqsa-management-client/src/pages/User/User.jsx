import { useEffect, useState } from "react";
import { PageHeader } from "../../components";
import UserTable from "./UserTable";
import dev from "../../config";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const User = () => {
  const [getData, setGetData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${dev.serverUrl}/api/users?search=${search}&limit=${limit}&page=${page}`
        );
        const data = await res.json();
        setGetData(data);
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [search, page, limit]);

  useEffect(() => {
    setPage(1);
  }, [search, limit]);

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
        refetch={refetch}
        isLoading={isLoading}
        filter={{ search, setSearch, setPage, limit, setLimit }}
      />
    </div>
  );
};

export default User;
