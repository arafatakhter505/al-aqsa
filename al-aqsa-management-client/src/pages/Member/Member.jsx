import { useEffect, useState } from "react";
import { PageHeader } from "../../components";
import dev from "../../config";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import MemberTable from "./MemberTable";

const Member = () => {
  const [getData, setGetData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, refetch } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${dev.serverUrl}/api/members?search=${search}&limit=${limit}&page=${page}`,
          {
            headers: {
              authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
          }
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
        title="All Members"
        btnText="Add Member"
        path="/add-member"
        icon="add"
      />
      <MemberTable
        data={getData}
        refetch={refetch}
        isLoading={isLoading}
        filter={{ search, setSearch, setPage, limit, setLimit }}
      />
    </div>
  );
};

export default Member;
