import { FilterChart, MonthChart } from "../../components";

const DashboardChart = ({ expense, donation }) => {
  return (
    <div className="flex  justify-between gap-5 lg:flex-nowrap flex-wrap">
      <div className="lg:w-2/3 w-full">
        <MonthChart expense={expense} donation={donation} />
      </div>
      <div className="lg:w-1/3 w-full">
        <FilterChart />
      </div>
    </div>
  );
};

export default DashboardChart;
