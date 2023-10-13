import { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ModalContext } from "../../contextApi/ModalContextApi";
import dev from "../../config";
import toast from "react-hot-toast";

const UserTableRow = ({ user, index, refetch }) => {
  const { setShowModal, setTitle, setBtn, setModalContent, setBtnAction } =
    useContext(ModalContext);
  const checkOddNumber = (index + 1) % 2 === 0 ? true : false;

  const handleDelete = async () => {
    try {
      const response = await fetch(`${dev.serverUrl}/api/users/${user?._id}`, {
        method: "DELETE",
      });
      const deleteUser = await response.json();
      if (deleteUser.success) {
        setShowModal(false);
        refetch();
        toast.success(deleteUser.message);
      } else {
        toast.error(deleteUser.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleModal = () => {
    setShowModal(true);
    setTitle("Delete");
    setBtn("Delete");
    setModalContent("Are you sure you want to delete this user?");
    setBtnAction(() => handleDelete);
  };

  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-100 ${
        checkOddNumber && "bg-gray-50"
      }`}
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">
        {user?.fullName}
      </td>
      <td className="py-3 px-6 text-left">{user?.userName}</td>
      <td className="py-3 px-6 text-left">{user?.email}</td>
      <td className="py-3 px-6 text-center">{user?.role}</td>
      <td className="py-3 px-6 text-center">
        {user?.isBlocked ? (
          <span className="bg-red-400 text-red-900 py-[0.25em] px-[0.65em] rounded-lg">
            Blocked
          </span>
        ) : (
          <span className="bg-green-400 text-green-900 py-[0.25em] px-[0.65em] rounded-lg">
            Active
          </span>
        )}
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-end gap-2">
          <Link
            to={`/update-user/${user?._id}`}
            className="flex items-center gap-1 bg-green-900 text-white px-3 py-2 rounded-md"
          >
            <AiOutlineEdit />
            Edit
          </Link>
          <button
            onClick={handleModal}
            className="flex items-center gap-1 bg-red-700 text-white px-3 py-2 rounded-md"
          >
            <BsTrash />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
