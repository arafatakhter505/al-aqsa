import { GiExpense } from "react-icons/gi";
import { DashboardCard } from "../../components";
import { LiaDonateSolid } from "react-icons/lia";
import { TbMoneybag } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";

const DashboardHeader = ({ headerInfo }) => {
  const { expense, donation, members } = headerInfo;

  let totalDonation = 0;
  donation && donation.map((item) => (totalDonation += item.amount));

  let totalExpense = 0;
  expense && expense.map((item) => (totalExpense += item.amount));

  const totalRemaining = totalDonation - totalExpense;

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-5 mb-6">
      <DashboardCard
        tkIcon={true}
        icon={LiaDonateSolid}
        value={totalDonation}
        text={"Donation"}
      />
      <DashboardCard
        tkIcon={true}
        icon={GiExpense}
        value={totalExpense}
        text={"Expense"}
      />
      <DashboardCard
        tkIcon={true}
        icon={TbMoneybag}
        value={totalRemaining}
        text={"Remaining"}
      />
      <DashboardCard
        tkIcon={false}
        icon={FiUsers}
        value={members ? members.length : 0}
        text={"Members"}
      />
    </div>
  );
};

export default DashboardHeader;
