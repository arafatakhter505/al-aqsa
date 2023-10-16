import { useContext } from "react";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ModalContext } from "../../contextApi/ModalContextApi";
import dev from "../../config";
import toast from "react-hot-toast";
import { AuthContext } from "../../contextApi/UserContext";

const BatchDetailsTableRow = ({ student, index, refetch }) => {
  const { user } = useContext(AuthContext);
  const { setShowModal, setTitle, setBtn, setModalContent, setBtnAction } =
    useContext(ModalContext);
  const checkOddNumber = (index + 1) % 2 === 0 ? true : false;

  const access =
    user.role === "Super Admin" ||
    user.role === "Admin" ||
    user.role === "Editor";

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${dev.serverUrl}/api/students/${student?._id}`,
        {
          method: "DELETE",
        }
      );
      const deleteStudent = await response.json();
      if (deleteStudent.success) {
        setShowModal(false);
        refetch();
        toast.success(deleteStudent.message);
      } else {
        toast.error(deleteStudent.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleModal = () => {
    setShowModal(true);
    setTitle("Delete");
    setBtn("Delete");
    setModalContent("Are you sure you want to delete this student?");
    setBtnAction(() => handleDelete);
  };

  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-100 ${
        checkOddNumber && "bg-gray-50"
      }`}
    >
      <td className="py-3 px-6 text-left flex items-center whitespace-nowrap">
        {student?.name}
        <Link
          to={`/student-attendance/${student?._id}`}
          className="bg-[#1C2434] text-[#C6CCD7] px-1 rounded-md ml-2"
        >
          Attendance
        </Link>
      </td>
      <td className="py-3 px-6 text-left">
        <a href={`tel:0${student?.contact}`}>0{student?.contact}</a>
      </td>
      <td className="py-3 px-6 text-left">{student?.address}</td>
      <td className="py-3 px-6 text-center">{student?.batch?.name}</td>
      {access && (
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center text-xl gap-2">
            <Link to={`/update-student/${student?._id}`}>
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

export default BatchDetailsTableRow;
