import { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ModalContext } from "../../contextApi/ModalContextApi";
import dev from "../../config";
import toast from "react-hot-toast";
import { AuthContext } from "../../contextApi/UserContext";

const ExpenseTableRow = ({ expense, index, refetch }) => {
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
        `${dev.serverUrl}/api/expenses/${expense?._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      const deleteExpense = await response.json();
      if (deleteExpense.success) {
        setShowModal(false);
        refetch();
        toast.success(deleteExpense.message);
      } else {
        toast.error(deleteExpense.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleModal = () => {
    setShowModal(true);
    setTitle("Delete");
    setBtn("Delete");
    setModalContent("Are you sure you want to delete this expense?");
    setBtnAction(() => handleDelete);
  };

  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-100 ${
        checkOddNumber && "bg-gray-50"
      }`}
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">
        {new Date(expense?.date).toDateString()}
      </td>
      <td className="py-3 px-6 text-left">{expense?.amount}/-</td>
      <td className="py-3 px-6 text-center  w-[160px]">{expense?.about}</td>
      <td className="py-3 px-6 text-center">{expense?.expensePerson}</td>
      <td className="py-3 px-6 text-center">
        {new Date(expense?.updatedAt).toDateString()}
      </td>
      {access && (
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center text-xl gap-2">
            <Link to={`/update-expense/${expense?._id}`}>
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

export default ExpenseTableRow;
