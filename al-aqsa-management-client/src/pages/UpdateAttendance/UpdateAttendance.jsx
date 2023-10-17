import { PageHeader } from "../../components";
import { useEffect, useState } from "react";
import dev from "../../config";
import { useParams } from "react-router-dom";
import UpdateAttendanceTable from "./UpdateAttendanceTable";
import toast from "react-hot-toast";

const UpdateAttendance = () => {
  const { id } = useParams();
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    try {
      fetch(`${dev.serverUrl}/api/attendances/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setAttendance(data.attendance);
          setDate(data.attendance.date);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  return (
    <div>
      <PageHeader
        title="Update Attendance"
        btnText="All Attendance"
        icon="back"
        path="/attendance"
      />
      <UpdateAttendanceTable
        attendance={attendance}
        date={date}
        setDate={setDate}
      />
    </div>
  );
};

export default UpdateAttendance;
