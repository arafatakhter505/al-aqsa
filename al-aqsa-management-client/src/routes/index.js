import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { LiaChalkboardTeacherSolid, LiaDonateSolid } from "react-icons/lia";
import { GiExpense } from "react-icons/gi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiPresentationChartLight } from "react-icons/pi";
import {
  Attendance,
  Batch,
  Dashboard,
  Donation,
  Expense,
  Member,
  User,
} from "../pages";

const routes = [
  {
    path: "/",
    title: "Dashboard",
    component: Dashboard,
    icon: LuLayoutDashboard,
    show: ["Super Admin", "Admin", "Viewer", "Trainer", "Editor"],
  },
  {
    path: "/member",
    title: "Member",
    component: Member,
    icon: LuUsers,
    show: ["Super Admin", "Admin", "Viewer", "Trainer", "Editor"],
  },
  {
    path: "/donation",
    title: "Donation",
    component: Donation,
    icon: LiaDonateSolid,
    show: ["Super Admin", "Admin", "Viewer", "Trainer", "Editor"],
  },
  {
    path: "/expense",
    title: "Expense",
    component: Expense,
    icon: GiExpense,
    show: ["Super Admin", "Admin", "Viewer", "Trainer", "Editor"],
  },
  {
    path: "/teaching-quran",
    title: "Teaching Quran",
    component: Batch,
    icon: LiaChalkboardTeacherSolid,
    show: ["Super Admin", "Admin", "Viewer", "Trainer", "Editor"],
  },
  {
    path: "/attendance",
    title: "Attendance",
    component: Attendance,
    icon: PiPresentationChartLight,
    show: ["Super Admin", "Admin", "Viewer", "Trainer", "Editor"],
  },
  {
    path: "/user",
    title: "User",
    component: User,
    icon: MdOutlineAdminPanelSettings,
    show: ["Super Admin", "Admin"],
  },
];

export default routes;
