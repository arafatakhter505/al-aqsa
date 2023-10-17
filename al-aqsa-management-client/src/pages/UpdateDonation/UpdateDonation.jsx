import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { PageHeader, Spinner } from "../../components";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import dev from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const UpdateDonation = () => {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [donerName, setDonarName] = useState("");
  const [comment, setComment] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [showMember, setShowMember] = useState(false);
  const navigate = useNavigate();
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();

  useEffect(() => {
    try {
      fetch(`${dev.serverUrl}/api/members`)
        .then((res) => res.json())
        .then((data) => setMembers(data.members));
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    if (showMember) {
      setDonarName(members[0].name);
    }
  }, [showMember]);

  // get donation
  useEffect(() => {
    try {
      fetch(`${dev.serverUrl}/api/donation/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDate(data.donation.date);
          setAmount(data.donation.amount);
          setDonarName(data.donation.donerName);
          setComment(data.donation.comment);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const checkAmount = Number(amount);
    if (!checkAmount) {
      return toast.error("Enter valid donation amount");
    }
    const updateDonationInfo = { date, amount, donerName, comment };

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(`${dev.serverUrl}/api/donation/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateDonationInfo),
      });
      const updateDonation = await response.json();
      if (updateDonation.success) {
        toast.success(updateDonation.message);
        setSubmitLoading(false);
        navigate("/donation");
      } else {
        setSubmitLoading(false);
        toast.error(updateDonation.message);
      }
    } catch (error) {
      setSubmitLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <PageHeader
        title="Update Donation"
        btnText="All Donation"
        icon="back"
        path="/donation"
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
                  value={`${year}-${month}-${day > 9 ? day : "0" + day}`}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
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
            <label className="mb-2.5 block text-black">Doner Name</label>
            {showMember ? (
              <div className="relative">
                <select
                  value={donerName}
                  onChange={(e) => setDonarName(e.target.value)}
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
                  placeholder="Enter doner name"
                  value={donerName}
                  onChange={(e) => setDonarName(e.target.value)}
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
              <label htmlFor="show-member">The donor is a member</label>
            </div>
          </div>

          <div className="w-full mb-6">
            <label className="mb-2.5 block text-black">Comment</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
              />

              <span className="absolute right-4 top-4 text-2xl text-gray-400">
                <AiOutlineComment />
              </span>
            </div>
          </div>

          <div className="w-full pt-2">
            <button
              type="submit"
              className="w-full bg-[#1C2434] text-[#C6CCD7] font-semibold px-6 py-3 rounded-md"
              disabled={submitLoading}
            >
              {submitLoading ? <Spinner /> : "Update Donation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonation;
