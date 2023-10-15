import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Loading } from "../../components";
import DonationTableRow from "./DonationTableRow";
import { RxCross2 } from "react-icons/rx";

const DonationTable = ({ data, filter, refetch, isLoading }) => {
  const { donations, pagination } = data;
  const {
    search,
    setSearch,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    setPage,
    limit,
    setLimit,
  } = filter;

  return (
    <div className="bg-white p-5 mb-6 rounded-md shadow">
      <div className="flex items-center justify-between gap-5 md:flex-row flex-col">
        <div className="lg:w-2/4 md:w-2/5 w-full flex items-center justify-between gap-5">
          <div className="md:w-full w-2/3">
            <label className="block">Search</label>
            <div className="relative">
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
          </div>
          <div className="md:hidden w-1/3">
            <label className="text-lg block">Show Item</label>
            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="p-3 outline-none border w-full"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 md:w-3/5 w-full">
          <div className="md:w-1/3 w-1/2">
            <label className="block">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full outline-none border p-3 rounded-md"
            />
          </div>
          <div className="md:w-1/3 w-1/2">
            <label className="block">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-[95%] outline-none border p-3 rounded-md"
            />
          </div>
          <div className="md:w-1/3 hidden md:block">
            <label className="text-lg block">Show Item</label>
            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="p-3 outline-none border w-full"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
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
                  <th className="py-3 px-6 text-left">Donar Name</th>
                  <th className="py-3 px-6 text-center">Amount</th>
                  <th className="py-3 px-6 text-center">Comment</th>
                  <th className="py-3 px-6 text-center">Last Update</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {donations &&
                  donations.map((item, index) => (
                    <DonationTableRow
                      key={item._id}
                      index={index}
                      donation={item}
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

export default DonationTable;
