import { Dashboard, Member, User } from "../pages";
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
  },
  {
    path: "/member",
    title: "Member",
    component: Member,
    icon: LuUsers,
  },
  {
    path: "/donation",
    title: "Donation",
    component: Member,
    icon: LiaDonateSolid,
  },
  {
    path: "/expense",
    title: "Expense",
    component: Member,
    icon: GiExpense,
  },
  {
    path: "/teaching-quran",
    title: "Teaching Quran",
    component: Member,
    icon: LiaChalkboardTeacherSolid,
  },
  {
    path: "/event",
    title: "Event",
    component: Member,
    icon: BsCalendar2Event,
  },
  {
    path: "/user",
    title: "User",
    component: User,
    icon: MdOutlineAdminPanelSettings,
  },
];

export default routes;
