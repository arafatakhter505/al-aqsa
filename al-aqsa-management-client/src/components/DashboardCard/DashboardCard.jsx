import CountUp from "react-countup";

const DashboardCard = ({ tkIcon, icon: IconComponent, amount, text }) => {
  return (
    <div className="p-5 bg-white shadow border rounded-md lg:flex items-center justify-between">
      <div className="lg:1/3">
        <div className="text-4xl bg-[#3C50E0] text-white lg:w-14 lg:h-14 w-16 h-16 flex items-center justify-center rounded-full mx-auto">
          <IconComponent className="w-full" />
        </div>
      </div>
      <div className="lg:w-2/3 lg:mt-0 mt-4 lg:text-left text-center">
        <h3 className="text-2xl font-semibold text-[#1C2434]">
          <span className={`font-extrabold ${tkIcon || "hidden"} mr-1`}>৳</span>
          <CountUp end={amount} />
        </h3>
        <p className="text-sm">Total {text}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
