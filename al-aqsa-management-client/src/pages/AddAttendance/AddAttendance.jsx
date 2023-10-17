import { useContext, useEffect, useState } from "react";
import { PageHeader } from "../../components";
import AddAttendanceTable from "./AddAttendanceTable";
import dev from "../../config";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../contextApi/UserContext";

const AddAttendance = () => {
  const { user } = useContext(AuthContext);
  const [allBatch, setAllBatch] = useState([]);
  const [batch, setBatch] = useState("");

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`${dev.serverUrl}/api/batch`)
      .then((res) => res.json())
      .then((data) => {
        setAllBatch(data.batch);
        setBatch(data.batch[0]._id);
      });
  }, []);

  const { isLoading, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      try {
        const res = await fetch(`${dev.serverUrl}/api/students?batch=${batch}`);
        const data = await res.json();
        setStudents(data.students);
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [batch]);

  return (
    <div>
      <PageHeader
        title="Add New Attendance"
        btnText="All Attendance"
        icon="back"
        path="/attendance"
        custom={user.role === "Trainer"}
      />
      <AddAttendanceTable
        allBatch={allBatch}
        batch={batch}
        setBatch={setBatch}
        students={students}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AddAttendance;
