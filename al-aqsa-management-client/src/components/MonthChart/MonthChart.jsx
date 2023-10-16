import ReactApexChart from "react-apexcharts";

const MonthChart = ({ expense, donation }) => {
  const donationMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const expenseMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const year = new Date().getFullYear();
  let maxAmount = 0;

  donation &&
    donation.map((item) => {
      if (new Date(item.date).getFullYear() === year) {
        const month = new Date(item.date).getMonth();
        donationMonth[month] += item.amount;
        maxAmount =
          maxAmount < donationMonth[month] ? donationMonth[month] : maxAmount;
      }
    });
  expense &&
    expense.map((item) => {
      if (new Date(item.date).getFullYear() === year) {
        const month = new Date(item.date).getMonth();
        expenseMonth[month] += item.amount;
        maxAmount =
          maxAmount < expenseMonth[month] ? expenseMonth[month] : maxAmount;
      }
    });

  const state = {
    series: [
      {
        name: "Total Donation",
        data: donationMonth,
      },

      {
        name: "Total Expense",
        data: expenseMonth,
      },
    ],
    options: {
      legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
      },
      colors: ["#3C50E0", "#80CAEE"],
      chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "area",
        dropShadow: {
          enabled: true,
          color: "#623CEA14",
          top: 10,
          blur: 4,
          left: 0,
          opacity: 0.1,
        },

        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              height: 300,
            },
          },
        },
        {
          breakpoint: 1366,
          options: {
            chart: {
              height: 350,
            },
          },
        },
      ],
      stroke: {
        width: [2, 2],
        curve: "straight",
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#3056D3", "#80CAEE"],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
          size: undefined,
          sizeOffset: 5,
        },
      },
      xaxis: {
        type: "category",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          style: {
            fontSize: "0px",
          },
        },
        min: 0,
        max: maxAmount + 1000,
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-md border p-5 h-full">
      <div className="flex items-center justify-between gap-5 px-5 pt-2 flex-wrap">
        <div className="flex items-center justify-start gap-5">
          <div className="flex items-center">
            <span className="w-5 h-5 border border-[#3C50E0] flex items-center justify-center rounded-full">
              <span className="block w-3 h-3  bg-[#3C50E0] rounded-full"></span>
            </span>
            <h3 className="font-semibold text-[#3C50E0] text-xl ml-3">
              Total Donation
            </h3>
          </div>
          <div className="flex items-center">
            <span className="w-5 h-5 border border-[#0FADCF] flex items-center justify-center rounded-full">
              <span className="block w-3 h-3  bg-[#0FADCF] rounded-full"></span>
            </span>
            <h3 className="font-semibold text-[#0FADCF] text-xl ml-3">
              Total Expense
            </h3>
          </div>
        </div>
        <div>
          <span className="font-semibold text-xl flex items-center gap-2">
            Year: {year}
          </span>
        </div>
      </div>
      <div>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default MonthChart;
