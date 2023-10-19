import { PageHeader } from "../../components";
import { useEffect, useState } from "react";
import dev from "../../config";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BatchDetailsTable from "./BatchDetailsTable";
import TrainerInfo from "./TrainerInfo";

const BatchDetails = () => {
  const { id } = useParams();
  const [getData, setGetData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${dev.serverUrl}/api/students?search=${search}&limit=${limit}&page=${page}&batch=${id}`,
          {
            headers: {
              authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user"))?.token
              }`,
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
        title={`Total Student: ${
          getData.totalStudent ? getData.totalStudent : 0
        }`}
        btnText="Add Student"
        path={`/add-student/${id}`}
        icon="add"
      />
      <BatchDetailsTable
        data={getData}
        refetch={refetch}
        isLoading={isLoading}
        filter={{ search, setSearch, setPage, limit, setLimit }}
      />
      <TrainerInfo id={id} />
    </div>
  );
};

export default BatchDetails;
