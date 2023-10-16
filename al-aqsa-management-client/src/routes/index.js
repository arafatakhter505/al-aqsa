import { Dashboard, Donation, Expense, Member, User } from "../pages";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { LiaChalkboardTeacherSolid, LiaDonateSolid } from "react-icons/lia";
import { GiExpense } from "react-icons/gi";
import { BsCalendar2Event } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

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
    component: Member,
    icon: LiaChalkboardTeacherSolid,
    show: ["Super Admin", "Admin", "Viewer", "Trainer", "Editor"],
  },
  {
    path: "/event",
    title: "Event",
    component: Member,
    icon: BsCalendar2Event,
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
// const routes = [
//   {
//     path: "/",
//     title: "Dashboard",
//     component: Dashboard,
//     icon: LuLayoutDashboard,
//   },
//   {
//     path: "/member",
//     title: "Member",
//     component: Member,
//     icon: LuUsers,
//   },
//   {
//     path: "/donation",
//     title: "Donation",
//     component: Member,
//     icon: LiaDonateSolid,
//   },
//   {
//     path: "/expense",
//     title: "Expense",
//     component: Member,
//     icon: GiExpense,
//   },
//   {
//     path: "/teaching-quran",
//     title: "Teaching Quran",
//     component: Member,
//     icon: LiaChalkboardTeacherSolid,
//   },
//   {
//     path: "/event",
//     title: "Event",
//     component: Member,
//     icon: BsCalendar2Event,
//   },
//   {
//     path: "/user",
//     title: "User",
//     component: User,
//     icon: MdOutlineAdminPanelSettings,
//   },
// ];

export default routes;
