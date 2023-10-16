import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import dev from "../../config";
import DashboardChart from "./DashboardChart";

const Dashboard = () => {
  const [expense, setExpense] = useState([]);
  const [donation, setDonation] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`${dev.serverUrl}/api/members`)
      .then((res) => res.json())
      .then((data) => setMembers(data.members));

    fetch(`${dev.serverUrl}/api/expenses`)
      .then((res) => res.json())
      .then((data) => setExpense(data.expenses));

    fetch(`${dev.serverUrl}/api/donation`)
      .then((res) => res.json())
      .then((data) => setDonation(data.donations));
  }, []);

  const headerInfo = { expense, donation, members };

  return (
    <div>
      <DashboardHeader headerInfo={headerInfo} />
      <DashboardChart expense={expense} donation={donation} />
    </div>
  );
};

export default Dashboard;
