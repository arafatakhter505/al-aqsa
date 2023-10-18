import { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ModalContext } from "../../contextApi/ModalContextApi";
import dev from "../../config";
import toast from "react-hot-toast";
import { AuthContext } from "../../contextApi/UserContext";

const AttendanceTableRow = ({ attendance, index, refetch }) => {
  const { user } = useContext(AuthContext);
  const { setShowModal, setTitle, setBtn, setModalContent, setBtnAction } =
    useContext(ModalContext);
  const checkOddNumber = (index + 1) % 2 === 0 ? true : false;

  let totalPresent = 0;
  let totalAbsent = 0;

  attendance &&
    attendance.students.map((student) =>
      student.attendance ? (totalPresent += 1) : (totalAbsent += 1)
    );

  const access =
    user.role === "Super Admin" ||
    user.role === "Admin" ||
    user.role === "Editor" ||
    user.role === "Trainer";

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${dev.serverUrl}/api/attendances/${attendance?._id}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${document.cookie.split("=")[1]}` },
        }
      );
      const deleteAttendance = await response.json();
      if (deleteAttendance.success) {
        setShowModal(false);
        refetch();
        toast.success(deleteAttendance.message);
      } else {
        toast.error(deleteAttendance.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleModal = () => {
    setShowModal(true);
    setTitle("Delete");
    setBtn("Delete");
    setModalContent("Are you sure you want to delete this attendance?");
    setBtnAction(() => handleDelete);
  };

  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-100 ${
        checkOddNumber && "bg-gray-50"
      }`}
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">
        {new Date(attendance?.date).toDateString()}
        <Link
          to={`/attendance-details/${attendance?._id}`}
          className="bg-[#1C2434] text-[#C6CCD7] px-1 rounded-md ml-2"
        >
          Details
        </Link>
      </td>
      <td className="py-3 px-6 text-left">{attendance?.batch?.name}</td>
      <td className="py-3 px-6 text-center">{totalPresent}</td>
      <td className="py-3 px-6 text-center">{totalAbsent}</td>
      <td className="py-3 px-6 text-center">
        {new Date(attendance?.updatedAt).toDateString()}
      </td>
      {access && (
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center text-xl gap-2">
            <Link to={`/update-attendance/${attendance?._id}`}>
              <AiOutlineEdit />
            </Link>
            <button onClick={handleModal}>
              <BsTrash />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default AttendanceTableRow;
