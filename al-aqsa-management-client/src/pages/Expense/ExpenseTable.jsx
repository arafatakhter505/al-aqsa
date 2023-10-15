import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Loading } from "../../components";
import ExpenseTableRow from "./ExpenseTableRow";

const ExpenseTable = ({ data, filter, refetch, isLoading }) => {
  const { expenses, pagination } = data;
  const { search, setSearch, setPage, limit, setLimit } = filter;

  return (
    <div className="bg-white p-5 mb-6 rounded-md shadow">
      <div className="flex items-center justify-between gap-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-2/3 outline-none border p-3 rounded-md"
          placeholder="Search......."
        />
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
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-center">About</th>
                  <th className="py-3 px-6 text-center">Person</th>
                  <th className="py-3 px-6 text-center">Last Update</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {expenses &&
                  expenses.map((item, index) => (
                    <ExpenseTableRow
                      key={item._id}
                      index={index}
                      expense={item}
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

export default ExpenseTable;
