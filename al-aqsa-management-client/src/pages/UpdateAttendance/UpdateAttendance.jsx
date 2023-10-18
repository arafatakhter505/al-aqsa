import { PageHeader } from "../../components";
import { useContext, useEffect, useState } from "react";
import dev from "../../config";
import { useParams } from "react-router-dom";
import UpdateAttendanceTable from "./UpdateAttendanceTable";
import toast from "react-hot-toast";
import { AuthContext } from "../../contextApi/UserContext";

const UpdateAttendance = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    try {
      fetch(`${dev.serverUrl}/api/attendances/${id}`, {
        headers: { authorization: `Bearer ${document.cookie.split("=")[1]}` },
      })
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
        custom={user.role === "Trainer"}
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
