import { useEffect, useState } from "react";
import { PageHeader, Spinner } from "../../components";
import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import dev from "../../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

const AddExpense = () => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [about, setAbout] = useState("");
  const [expensePerson, setExpensePerson] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [showMember, setShowMember] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch(`${dev.serverUrl}/api/members`, {
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
        .then((res) => res.json())
        .then((data) => setMembers(data.members));
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    if (showMember) {
      setExpensePerson(members[0].name);
    } else {
      setExpensePerson("");
    }
  }, [showMember]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const checkAmount = Number(amount);
    if (!checkAmount) {
      return toast.error("Enter valid expense amount");
    }
    const expense = { date, amount, about, expensePerson };

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(
        `${dev.serverUrl}/api/expenses/add-expense`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.token
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expense),
        }
      );
      const createExpense = await response.json();
      if (createExpense.success) {
        toast.success(createExpense.message);
        setSubmitLoading(false);
        setDate("");
        setAmount("");
        setAbout("");
        setExpensePerson("");
        navigate("/expense");
      } else {
        setSubmitLoading(false);
        toast.error(createExpense.message);
      }
    } catch (error) {
      setSubmitLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <PageHeader
        title="Add New Expense"
        btnText="All Expenses"
        icon="back"
        path="/expense"
      />
      <div className="rounded-md border bg-white shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex items-start justify-between md:flex-nowrap flex-wrap gap-6">
            <div className="w-full">
              <label className="mb-2.5 block text-black">Date</label>
              <div className="relative">
                <input
                  type="date"
                  placeholder="Enter date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <CiCalendarDate />
                </span>
              </div>
            </div>
            <div className="w-full">
              <label className="mb-2.5 block text-black">Amount</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <FaRegMoneyBillAlt />
                </span>
              </div>
            </div>
          </div>

          <div className="w-full mb-6">
            <label className="mb-2.5 block text-black">About</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                required
              />

              <span className="absolute right-4 top-4 text-2xl text-gray-400">
                <AiOutlineComment />
              </span>
            </div>
          </div>

          <div className="w-full mb-6">
            <label className="mb-2.5 block text-black">Expense Person</label>
            {showMember ? (
              <div className="relative">
                <select
                  value={expensePerson}
                  onChange={(e) => setExpensePerson(e.target.value)}
                  className="relative z-20 w-full appearance-none rounded border bg-transparent py-4 px-6 outline-none transition focus:border-primary active:border-primary"
                  required
                >
                  {members.map((member) => (
                    <option key={member?._id} value={member?.name}>
                      {member?.name}
                    </option>
                  ))}
                </select>

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <RiArrowDropDownLine />
                </span>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter expense person name"
                  value={expensePerson}
                  onChange={(e) => setExpensePerson(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <AiOutlineUser />
                </span>
              </div>
            )}

            <div className="pt-2">
              <input
                type="checkbox"
                id="show-member"
                value={showMember}
                onChange={() => setShowMember(!showMember)}
                className="mx-2"
              />
              <label htmlFor="show-member">
                The expense person is a member?
              </label>
            </div>
          </div>

          <div className="w-full pt-2">
            <button
              type="submit"
              className="w-full bg-[#1C2434] text-[#C6CCD7] font-semibold px-6 py-3 rounded-md"
              disabled={submitLoading}
            >
              {submitLoading ? <Spinner /> : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
