import { useEffect, useState } from "react";

const AddAttendanceTableRow = ({
  student,
  index,
  studentsAttendance,
  setHandleAttendance,
}) => {
  const [attendance, setAttendance] = useState(true);
  const checkOddNumber = (index + 1) % 2 === 0 ? true : false;

  studentsAttendance[index].attendance = attendance;
  useEffect(() => {
    setHandleAttendance(studentsAttendance);
  }, [attendance]);

  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-100 ${
        checkOddNumber && "bg-gray-50"
      }`}
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">{student?.name}</td>
      <td className="py-3 px-6 text-left">
        <select
          value={attendance}
          onChange={() => setAttendance(!attendance)}
          className="w-full outline-none border p-3 rounded-md"
        >
          <option value={true}>Present</option>
          <option value={false}>Absent</option>
        </select>
      </td>
    </tr>
  );
};

export default AddAttendanceTableRow;
