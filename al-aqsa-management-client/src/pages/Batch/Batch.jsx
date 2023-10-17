import { useEffect, useState } from "react";
import dev from "../../config";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "../../components";
import BatchTable from "./BatchTable";

const Batch = () => {
  const [getData, setGetData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, refetch } = useQuery({
    queryKey: ["batch"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${dev.serverUrl}/api/batch?search=${search}&limit=${limit}&page=${page}`
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
        title="All Batch"
        btnText="Add Batch"
        path="/add-batch"
        icon="add"
      />
      <BatchTable
        data={getData}
        refetch={refetch}
        isLoading={isLoading}
        filter={{ search, setSearch, setPage, limit, setLimit }}
      />
    </div>
  );
};

export default Batch;
