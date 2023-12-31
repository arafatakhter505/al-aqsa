import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dev from "../../config";
import AttendanceDetailsTable from "./AttendanceDetailsTable";

const AttendanceDetails = () => {
  const { id } = useParams();
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    fetch(`${dev.serverUrl}/api/attendances/${id}`, {
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAttendance(data.attendance));
  }, []);

  return (
    <div>
      <AttendanceDetailsTable attendance={attendance} />
    </div>
  );
};

export default AttendanceDetails;
