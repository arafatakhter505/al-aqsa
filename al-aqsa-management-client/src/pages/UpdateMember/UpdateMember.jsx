import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { PageHeader, Spinner } from "../../components";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import dev from "../../config";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMember = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [contact, setContact] = useState(null);
  const [position, setPosition] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  // get member
  useEffect(() => {
    try {
      fetch(`${dev.serverUrl}/api/members/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.member.name);
          setContact(data.member.contact);
          setPosition(data.member.position);
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

    const updateInfo = { name, contact, position };

    // fetch data
    try {
      setSubmitLoading(true);
      const response = await fetch(`${dev.serverUrl}/api/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateInfo),
      });
      const updateMember = await response.json();
      if (updateMember.success) {
        toast.success(updateMember.message);
        setSubmitLoading(false);
        navigate("/member");
      } else {
        setSubmitLoading(false);
        toast.error(updateMember.message);
      }
    } catch (error) {
      setSubmitLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <PageHeader
        title="Update Member"
        btnText="All Members"
        icon="back"
        path="/member"
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
            <label className="mb-2.5 block text-black">Member Position</label>
            <div className="relative">
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="relative z-20 w-full appearance-none rounded border bg-transparent py-4 px-6 outline-none transition focus:border-primary active:border-primary"
                required
              >
                <option value="Member">Member</option>
                <option value="Associate Publicity Editor">
                  Associate Publicity Editor
                </option>
                <option value="Publicity Editor">Publicity Editor</option>
                <option value="Social Service Editor">
                  Social Service Editor
                </option>
                <option value="Joint Organizing Secretary">
                  Joint Organizing Secretary
                </option>
                <option value="Organizing Secretary">
                  Organizing Secretary
                </option>
                <option value="Co-Cashier">Co-Cashier</option>
                <option value="Cashier">Cashier</option>
                <option value="Co-Secretary">Co-Secretary</option>
                <option value="Secretary">Secretary</option>
                <option value="Vice President">Vice President</option>
                <option value="President">President</option>
              </select>

              <span className="absolute right-4 top-4 text-2xl text-gray-400">
                <RiArrowDropDownLine />
              </span>
            </div>
          </div>

          <div className="w-full pt-2">
            <button
              type="submit"
              className="w-full bg-[#1C2434] text-[#C6CCD7] font-semibold px-6 py-3 rounded-md"
              disabled={submitLoading}
            >
              {submitLoading ? <Spinner /> : "Update Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMember;
