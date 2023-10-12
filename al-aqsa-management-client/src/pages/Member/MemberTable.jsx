import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const MemberTable = () => {
  return (
    <div className="bg-white p-5 mb-6 rounded-md shadow">
      <div>
        <form>
          <input
            type="text"
            className="w-full outline-none border p-3 rounded-md mb-3"
            placeholder="Search......."
          />
        </form>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full overflow-hidden">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Position</th>
                  <th className="py-3 px-6 text-center">Contact</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Jhone Doe
                  </td>
                  <td className="py-3 px-6 text-left">President</td>
                  <td className="py-3 px-6 text-center">0123456789</td>
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
                <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Jhone Doe
                  </td>
                  <td className="py-3 px-6 text-left">President</td>
                  <td className="py-3 px-6 text-center">0123456789</td>
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
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Jhone Doe
                  </td>
                  <td className="py-3 px-6 text-left">President</td>
                  <td className="py-3 px-6 text-center">0123456789</td>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberTable;
