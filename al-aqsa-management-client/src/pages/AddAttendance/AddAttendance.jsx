import { useState } from "react";
import { PageHeader, Spinner } from "../../components";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import dev from "../../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddAttendance = () => {
  return (
    <div>
      <PageHeader
        title="Add New Attendance"
        btnText="All Attendance"
        icon="back"
        path="/attendance"
      />
      <h2>add attendance</h2>
    </div>
  );
};

export default AddAttendance;
