import { useState } from "react";
import { PageHeader, Spinner } from "../../components";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import dev from "../../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdOutlineBatchPrediction } from "react-icons/md";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";

const AddBatch = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [trainerContact, setTrainerContact] = useState("");
  const [trainerAddress, setTrainerAddress] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contactNumber = Number(trainerContact);

    if (!contactNumber) {
      return toast.error("Enter valid contact number");
    }

    const batch = {
      name,
      startDate,
      endDate,
      trainer: { trainerName, trainerContact, trainerAddress },
    };

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(`${dev.serverUrl}/api/batch/add-batch`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batch),
      });
      const addBatch = await response.json();
      if (addBatch.success) {
        toast.success(addBatch.message);
        setSubmitLoading(false);
        setName("");
        setStartDate("");
        setEndDate("");
        setTrainerName("");
        setTrainerContact("");
        setTrainerAddress("");
        navigate("/teaching-quran");
      } else {
        setSubmitLoading(false);
        toast.error(addBatch.message);
      }
    } catch (error) {
      setSubmitLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <PageHeader
        title="Add New Batch"
        btnText="All Batch"
        icon="back"
        path="/teaching-quran"
      />
      <div className="rounded-md border bg-white shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex items-start justify-between md:flex-nowrap flex-wrap gap-6">
            <div className="w-full">
              <label className="mb-2.5 block text-black">Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter batch name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <MdOutlineBatchPrediction />
                </span>
              </div>
            </div>
            <div className="w-full">
              <label className="mb-2.5 block text-black">Trainer Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter trainer name"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <AiOutlineUser />
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-start justify-between md:flex-nowrap flex-wrap gap-6">
            <div className="w-full">
              <label className="mb-2.5 block text-black">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  placeholder="Enter start date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <CiCalendarDate />
                </span>
              </div>
            </div>
            <div className="w-full">
              <label className="mb-2.5 block text-black">End Date</label>
              <div className="relative">
                <input
                  type="date"
                  placeholder="Enter end date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <CiCalendarDate />
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-start justify-between md:flex-nowrap flex-wrap gap-6">
            <div className="w-full">
              <label className="mb-2.5 block text-black">Trainer Contact</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Enter trainer contact"
                  value={trainerContact}
                  onChange={(e) => setTrainerContact(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <AiOutlinePhone />
                </span>
              </div>
            </div>
            <div className="w-full">
              <label className="mb-2.5 block text-black">Trainer Address</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter trainer address"
                  value={trainerAddress}
                  onChange={(e) => setTrainerAddress(e.target.value)}
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                  required
                />

                <span className="absolute right-4 top-4 text-2xl text-gray-400">
                  <CiLocationOn />
                </span>
              </div>
            </div>
          </div>

          <div className="w-full pt-2">
            <button
              type="submit"
              className="w-full bg-[#1C2434] text-[#C6CCD7] font-semibold px-6 py-3 rounded-md"
              disabled={submitLoading}
            >
              {submitLoading ? <Spinner /> : "Add Batch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBatch;
