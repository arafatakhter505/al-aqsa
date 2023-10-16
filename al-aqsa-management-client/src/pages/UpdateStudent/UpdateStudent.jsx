import { useEffect, useState } from "react";
import { PageHeader, Spinner } from "../../components";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import dev from "../../config";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";

const UpdateStudent = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [batchId, setBatchId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  // get student
  useEffect(() => {
    try {
      fetch(`${dev.serverUrl}/api/students/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.student.name);
          setContact(data.student.contact);
          setAddress(data.student.address);
          setBatchId(data.student.batch.id);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contactNumber = Number(contact);

    if (!contactNumber) {
      return toast.error("Enter valid contact number");
    }

    const updateInfo = { name, contact, address };

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(`${dev.serverUrl}/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateInfo),
      });
      const updateStudent = await response.json();
      if (updateStudent.success) {
        toast.success(updateStudent.message);
        setSubmitLoading(false);
        navigate(`/batch-details/${batchId}`);
      } else {
        setSubmitLoading(false);
        toast.error(updateStudent.message);
      }
    } catch (error) {
      setSubmitLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <PageHeader
        title="Update Student"
        btnText="All Students"
        icon="back"
        path={`/batch-details/${batchId}`}
      />
      <div className="rounded-md border bg-white shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-6">
            <label className="mb-2.5 block text-black">Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                required
              />

              <span className="absolute right-4 top-4 text-2xl text-gray-400">
                <AiOutlineUser />
              </span>
            </div>
          </div>

          <div className="w-full mb-6">
            <label className="mb-2.5 block text-black">Contact</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="Enter contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                required
              />

              <span className="absolute right-4 top-4 text-2xl text-gray-400">
                <AiOutlinePhone />
              </span>
            </div>
          </div>

          <div className="w-full mb-6">
            <label className="mb-2.5 block text-black">Address</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                required
              />

              <span className="absolute right-4 top-4 text-2xl text-gray-400">
                <CiLocationOn />
              </span>
            </div>
          </div>

          <div className="w-full pt-2">
            <button
              type="submit"
              className="w-full bg-[#1C2434] text-[#C6CCD7] font-semibold px-6 py-3 rounded-md"
              disabled={submitLoading}
            >
              {submitLoading ? <Spinner /> : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
