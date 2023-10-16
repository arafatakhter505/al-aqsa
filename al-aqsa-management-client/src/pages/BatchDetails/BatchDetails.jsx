import { PageHeader } from "../../components";
import { useEffect, useState } from "react";
import dev from "../../config";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const BatchDetails = () => {
  const { id } = useParams();
  const [getData, setGetData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, refetch } = useQuery({
    queryKey: ["batch"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${dev.serverUrl}/api/batch?search=${search}&limit=${limit}&page=${page}&batch=${id}`
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
  return (
    <div>
      <PageHeader
        title="Total Student: 50"
        btnText="Add Student"
        path="/add-student"
        icon="add"
      />
    </div>
  );
};

export default BatchDetails;
