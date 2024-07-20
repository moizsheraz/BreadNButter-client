import { useGetGraphData } from "../../api/MyGraphApi";
import { useEffect, useState } from "react";
import MyRevenueChart from "./MyRevenueChart";

const RevenueChart = () => {
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
    <div>
      {data && (
        <div className="flex-1 h-[100vh] bg-[#FBB748] md:py-4 py-[3rem]">
          <div className="pt-4">
            <h1 className="text-center font-bold text-[2rem]">
              Revenue Comparison
            </h1>
          </div>
          <MyRevenueChart data={data} />
        </div>
      )}
    </div>
  );
};

export default RevenueChart;
