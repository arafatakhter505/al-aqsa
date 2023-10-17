import AttendanceDetailsTableRow from "./AttendanceDetailsTableRow";

const AttendanceDetailsTable = ({ attendance }) => {
  return (
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
            {attendance?.students?.map((item, index) => (
              <AttendanceDetailsTableRow
                key={item._id}
                index={index}
                student={item}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceDetailsTable;
