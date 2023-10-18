import { useEffect, useState } from "react";
import dev from "../../config";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CountUp from "react-countup";
import { WhiteTkIcon } from "../../assets";

const FilterChart = () => {
  const [donation, setDonation] = useState([]);
  const [expense, setExpense] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  let totalDonation = 0;
  donation.success &&
    donation.donations.map((item) => (totalDonation += item.amount));

  let totalExpense = 0;
  expense.success &&
    expense.expenses.map((item) => (totalExpense += item.amount));

  const { refetch } = useQuery({
    queryKey: ["calculation"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${dev.serverUrl}/api/donation?from=${fromDate}&to=${toDate}`,
          {
            headers: {
              authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
          }
        );
        const data = await res.json();
        setDonation(data);
        const exRes = await fetch(
          `${dev.serverUrl}/api/expenses?from=${fromDate}&to=${toDate}`,
          {
            headers: {
              authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
          }
        );
        const exData = await exRes.json();
        setExpense(exData);
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [fromDate, toDate]);

  return (
    <div className="bg-white shadow rounded-md border p-5 h-full">
      <h3 className="font-semibold text-center text-[#1C2434] text-xl">
        Total Calculation
      </h3>
      <div className="flex items-center justify-between gap-3 mt-3">
        <div className="w-1/2">
          <label className="block">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-[95%] outline-none border p-3 rounded-md"
          />
        </div>
        <div className="w-1/2">
          <label className="block">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-[93%] outline-none border p-3 rounded-md"
          />
        </div>
      </div>
      <div className="lg:block md:flex items-center justify-between gap-5">
        <div className="bg-[#3C50E0] text-white w-full p-5 mt-5 rounded-md shadow">
          <h3 className="text-2xl font-semibold mb-1">Total Donation</h3>
          <h3 className="text-4xl font-semibold flex items-center">
            <span className="mr-1">
              <img src={WhiteTkIcon} alt="tk" className="w-[22px]" />
            </span>
            <CountUp end={totalDonation} />
          </h3>
        </div>
        <div className="bg-[#0FADCF] text-white w-full p-5 mt-5 rounded-md shadow">
          <h3 className="text-2xl font-semibold mb-1">Total Expense</h3>
          <h3 className="text-4xl font-semibold flex items-center">
            <span className="mr-1">
              <img src={WhiteTkIcon} alt="tk" className="w-[22px]" />
            </span>
            <CountUp end={totalExpense} />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FilterChart;
