import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { PageHeader, Spinner } from "../../components";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import dev from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineBatchPrediction } from "react-icons/md";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";

const UpdateBatch = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [trainerContact, setTrainerContact] = useState("");
  const [trainerAddress, setTrainerAddress] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  // get batch
  useEffect(() => {
    try {
      fetch(`${dev.serverUrl}/api/batch/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.batch.name);
          setStartDate(data.batch.startDate);
          setEndDate(data.batch.end);
          setTrainerName(data.batch.trainer.trainerName);
          setTrainerContact(data.batch.trainer.trainerContact);
          setTrainerAddress(data.batch.trainer.trainerAddress);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contactNumber = Number(trainerContact);
    if (!contactNumber) {
      return toast.error("Enter valid contact number");
    }

    const updateInfo = {
      name,
      startDate,
      endDate,
      trainer: { trainerName, trainerContact, trainerAddress },
    };

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(`${dev.serverUrl}/api/batch/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateInfo),
      });
      const updateBatch = await response.json();
      if (updateBatch.success) {
        toast.success(updateBatch.message);
        setSubmitLoading(false);
        navigate("/teaching-quran");
      } else {
        setSubmitLoading(false);
        toast.error(updateBatch.message);
      }
    } catch (error) {
      setSubmitLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <PageHeader
        title="Update Batch"
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
              {submitLoading ? <Spinner /> : "Update Batch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBatch;