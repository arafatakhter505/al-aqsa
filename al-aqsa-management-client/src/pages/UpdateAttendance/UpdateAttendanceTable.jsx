import { useState } from "react";
import { Spinner } from "../../components";
import toast from "react-hot-toast";
import dev from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import UpdateAttTableRow from "./UpdateAttTableRow";

const UpdateAttendanceTable = ({ attendance, date, setDate }) => {
  const { id } = useParams();
  const [submitLoading, setSubmitLoading] = useState(false);
  const studentsAttendance = attendance.students;
  const navigate = useNavigate();
  const [handleAttendance, setHandleAttendance] = useState(studentsAttendance);
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();

  const handleSubmit = async () => {
    if (!date) {
      return toast.error("Please enter date");
    }

    const UpdateInfo = {
      date,
      students: handleAttendance,
    };

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(`${dev.serverUrl}/api/attendances/${id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateInfo),
      });
      const updateAttendance = await response.json();
      if (updateAttendance.success) {
        toast.success(updateAttendance.message);
        setSubmitLoading(false);
        navigate("/attendance");
      } else {
        setSubmitLoading(false);
        toast.error(updateAttendance.message);
      }
    } catch (error) {
      setSubmitLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white p-5 mb-6 rounded-md shadow">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-5 w-full">
        <div className="md:w-2/3 gap-5 flex flex-wrap md:flex-nowrap items-center justify-between">
          <div className="w-full">
            <input
              type="date"
              value={`${year}-${month > 9 ? month : "0" + month}-${
                day > 9 ? day : "0" + day
              }`}
              onChange={(e) => setDate(e.target.value)}
              className="w-full outline-none border p-3 rounded-md"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              defaultValue={attendance.batch?.name}
              className="w-full outline-none border p-3 rounded-md"
              readOnly
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#1C2434] text-[#C6CCD7] py-3 px-5 rounded-md md:w-1/3 w-full"
          disabled={submitLoading}
        >
          {submitLoading ? <Spinner /> : "Update Attendance"}
        </button>
      </div>
      <div className="w-full bg-white shadow-md rounded my-6">
        <div className="overflow-x-auto">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Student Name</th>
                <th className="py-3 px-6 text-left">Attendance</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {studentsAttendance?.map((item, index) => (
                <UpdateAttTableRow
                  key={item._id}
                  index={index}
                  student={item}
                  studentsAttendance={studentsAttendance}
                  setHandleAttendance={setHandleAttendance}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpdateAttendanceTable;
