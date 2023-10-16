import { useContext } from "react";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ModalContext } from "../../contextApi/ModalContextApi";
import dev from "../../config";
import toast from "react-hot-toast";
import { AuthContext } from "../../contextApi/UserContext";

const BatchTableRow = ({ batch, index, refetch }) => {
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
      const response = await fetch(`${dev.serverUrl}/api/batch/${batch?._id}`, {
        method: "DELETE",
      });
      const deleteBatch = await response.json();
      if (deleteBatch.success) {
        setShowModal(false);
        refetch();
        toast.success(deleteBatch.message);
      } else {
        toast.error(deleteBatch.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleModal = () => {
    setShowModal(true);
    setTitle("Delete");
    setBtn("Delete");
    setModalContent("Are you sure you want to delete this batch?");
    setBtnAction(() => handleDelete);
  };

  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-100 ${
        checkOddNumber && "bg-gray-50"
      }`}
    >
      <td className="py-3 px-6 text-left flex items-center whitespace-nowrap">
        {batch?.name}
        <Link
          to={`/batch-details/${batch?._id}`}
          className="bg-[#1C2434] text-[#C6CCD7] px-1 rounded-md ml-2"
        >
          Details
        </Link>
      </td>
      <td className="py-3 px-6 text-left">
        {new Date(batch?.startDate).toDateString()}
      </td>
      <td className="py-3 px-6 text-left">
        {batch?.endDate ? new Date(batch?.endDate).toDateString() : "Running"}
      </td>
      <td className="py-3 px-6 text-center">{batch?.trainer.trainerName}</td>
      {access && (
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center text-xl gap-2">
            <Link to={`/update-batch/${batch?._id}`}>
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

export default BatchTableRow;
