import { useContext, useEffect, useState } from "react";
import dev from "../../config";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "../../components";
import AttendanceTable from "./AttendanceTable";
import { AuthContext } from "../../contextApi/UserContext";

const Attendance = () => {
  const { user } = useContext(AuthContext);
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
          `${dev.serverUrl}/api/attendances?search=${search}&limit=${limit}&page=${page}&date=${date}`,
          {
            headers: {
              authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
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
  }, [search, page, limit, date]);

  useEffect(() => {
    setPage(1);
  }, [search, date, limit]);

  return (
    <div>
      <PageHeader
        title="All Attendance"
        btnText="Add Attendance"
        path="/add-attendance"
        icon="add"
        custom={user.role === "Trainer"}
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
