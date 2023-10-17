import { useEffect, useState } from "react";
import { Loading, Spinner } from "../../components";
import AddAttendanceTableRow from "./AddAttendanceTableRow";
import toast from "react-hot-toast";
import dev from "../../config";
import { useNavigate } from "react-router-dom";

const AddAttendanceTable = ({
  allBatch,
  batch,
  setBatch,
  students,
  isLoading,
}) => {
  const [date, setDate] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [getBatch, setGetBatch] = useState({});
  const studentsAttendance = [];
  const navigate = useNavigate();

  students &&
    students.map((student) =>
      studentsAttendance.push({
        name: student.name,
        id: student._id,
        attendance: true,
      })
    );

  const [handleAttendance, setHandleAttendance] = useState(studentsAttendance);

  useEffect(() => {
    fetch(`${dev.serverUrl}/api/batch/${batch}`)
      .then((res) => res.json())
      .then((data) => setGetBatch(data.batch));
  }, [batch]);

  const handleSubmit = async () => {
    if (!date) {
      return toast.error("Please enter date");
    }

    const attendance = {
      date,
      batch: { id: getBatch?._id, name: getBatch?.name },
      students: handleAttendance,
    };

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(
        `${dev.serverUrl}/api/attendances/add-attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendance),
        }
      );
      const createAttendance = await response.json();
      if (createAttendance.success) {
        toast.success(createAttendance.message);
        setSubmitLoading(false);
        setDate("");
        navigate("/attendance");
      } else {
        setSubmitLoading(false);
        toast.error(createAttendance.message);
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full outline-none border p-3 rounded-md"
            />
          </div>
          <div className="w-full">
            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full outline-none border p-3 rounded-md"
            >
              {allBatch.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#1C2434] text-[#C6CCD7] py-3 px-5 rounded-md md:w-1/3 w-full"
          disabled={submitLoading}
        >
          {submitLoading ? <Spinner /> : "Add Attendance"}
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        students && (
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
                  {students.map((item, index) => (
                    <AddAttendanceTableRow
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
        )
      )}
    </div>
  );
};

export default AddAttendanceTable;
