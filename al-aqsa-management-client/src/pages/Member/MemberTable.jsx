import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Loading } from "../../components";
import MemberTableRow from "./MemberTableRow";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { AuthContext } from "../../contextApi/UserContext";

const MemberTable = ({ data, filter, refetch, isLoading }) => {
  const { user } = useContext(AuthContext);
  const { members, pagination } = data;
  const { search, setSearch, setPage, limit, setLimit } = filter;
  const access =
    user.role === "Super Admin" ||
    user.role === "Admin" ||
    user.role === "Editor";

  return (
    <div className="bg-white p-5 mb-6 rounded-md shadow">
      <div className="flex items-center justify-between gap-6">
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Search......"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none border py-3 pl-4 pr-10 rounded-md"
            required
          />

          <span className="absolute right-4 top-3 text-2xl text-gray-400">
            {search && (
              <button onClick={() => setSearch("")}>
                <RxCross2 />
              </button>
            )}
          </span>
        </div>
        <div className="flex items-center justify-end w-1/3">
          <label className="text-lg hidden md:block">Rows Per Page</label>
          <select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="p-3 ml-2 outline-none border w-[100px]"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full bg-white shadow-md rounded my-6">
          <div className="overflow-x-auto">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Position</th>
                  <th className="py-3 px-6 text-center">Contact</th>
                  {access && <th className="py-3 px-6 text-center">Actions</th>}
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {members &&
                  members.map((member, index) => (
                    <MemberTableRow
                      key={member._id}
                      index={index}
                      member={member}
                      refetch={refetch}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          <div className="w-full p-4 justify-center items-center flex">
            {data?.success ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPage(pagination?.previousPage)}
                  disabled={pagination?.previousPage === null && true}
                  className={`flex items-center gap-2 ${
                    pagination?.previousPage === null && "text-gray-600"
                  }`}
                >
                  <BsArrowLeft />
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: pagination?.totalPage }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage(index + 1)}
                      className={`px-4 py-2 ${
                        pagination?.currentPage === index + 1 &&
                        "rounded-md bg-[#1C2434] text-[#C6CCD7]"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage(pagination?.nextPage)}
                  disabled={pagination?.nextPage === null && true}
                  className={`flex items-center gap-2 ${
                    pagination?.nextPage === null && "text-gray-600"
                  }`}
                >
                  Next
                  <BsArrowRight />
                </button>
              </div>
            ) : (
              <div>{data?.message}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberTable;
