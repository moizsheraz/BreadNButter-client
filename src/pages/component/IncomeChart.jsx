// import React from "react";
// import MyChart from "./MyChart";
// import { chartData } from "./IncomeChartData.js";

import MyResponsiveBar from "./MyChart";

// const IncomeChart = () => {
//   return (
//     <div className="IncomeChart">
//       <MyChart chartData={chartData} />
//     </div>
//   );
// };

// export default IncomeChart;

// import { data } from "./IncomeChartData";
// import { useEffect, useState } from "react";
import { useGetGraphData } from "../../api/MyGraphApi";
import { useEffect, useState } from "react";

const IncomeChart = () => {
  const [data, setData] = useState();
  const { getData } = useGetGraphData();
  useEffect(() => {
    const loadData = async () => {
      const graphData = await getData();

      if (graphData) {
        setData(graphData);
      }
    };

    loadData();
  }, []);

  if (data) {
    console.log(data);
  }
  // console.log(data);
  return (
    <>
      {data && (
        <div className="flex-1 h-[100vh] bg-[#FBB748] md:py-4 py-[3rem]">
          <div>
            <h1 className="text-center font-bold text-[2rem]">
              Cost Comparison
            </h1>
          </div>
          <MyResponsiveBar data={data} />
        </div>
      )}
    </>
  );
};

export default IncomeChart;
