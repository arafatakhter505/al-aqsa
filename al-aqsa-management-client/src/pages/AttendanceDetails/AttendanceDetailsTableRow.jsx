const AttendanceDetailsTableRow = ({ student, index }) => {
  const checkOddNumber = (index + 1) % 2 === 0 ? true : false;

  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-100 ${
        checkOddNumber && "bg-gray-50"
      }`}
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">{student?.name}</td>
      <td className="py-3 px-6 text-left">{`${
        student?.attendance ? "Present" : "Absent"
      }`}</td>
    </tr>
  );
};

export default AttendanceDetailsTableRow;
