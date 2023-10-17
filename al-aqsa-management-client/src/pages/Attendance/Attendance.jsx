import { useEffect, useState } from "react";
import dev from "../../config";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "../../components";
import AttendanceTable from "./AttendanceTable";

const Attendance = () => {
  const [getData, setGetData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [date, setDate] = useState("");

  const { isLoading, refetch } = useQuery({
    queryKey: ["attendances"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${dev.serverUrl}/api/attendances?search=${search}&limit=${limit}&page=${page}&date=${date}`
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
  }, [search, page, limit, date]);

  return (
    <div>
      <PageHeader
        title="All Attendance"
        btnText="Add Attendance"
        path="/add-attendance"
        icon="add"
      />
      <AttendanceTable
        data={getData}
        refetch={refetch}
        isLoading={isLoading}
        filter={{ search, setSearch, setPage, limit, setLimit, date, setDate }}
      />
    </div>
  );
};

export default Attendance;
