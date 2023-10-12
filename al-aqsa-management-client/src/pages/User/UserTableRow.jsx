import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const UserTableRow = ({ user, index }) => {
  const checkOddNumber = (index + 1) % 2 === 0 ? true : false;

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
      <td className="py-3 px-6 text-center">Active</td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-end gap-2">
          <button className="flex items-center gap-1 bg-green-900 text-white px-3 py-2 rounded-md">
            <AiOutlineEdit />
            Edit
          </button>
          <button className="flex items-center gap-1 bg-red-700 text-white px-3 py-2 rounded-md">
            <BsTrash />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
