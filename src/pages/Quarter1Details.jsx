import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetQuarter1 } from "../api/MyQuarterApi";
import RightNav from "./components/RightNav";

const Quarter1Details = () => {
  const { id } = useParams();

  const { getQuarter1 } = useGetQuarter1();
  const [quarter1Data, setQuarter1Data] = useState(null);

  useEffect(() => {
    const fetchQuarterData = async () => {
      try {
        const quarter1 = await getQuarter1(id);
        setQuarter1Data(quarter1.data);
      } catch (error) {
        console.error("Error fetching quarter data:", error);
      }
    };

    fetchQuarterData();
  }, [id]);
  return (
    <div className="w-full h-[100vh] flex bg-[#fbb748] relative overflow-hidden">
      {/* <div className="h-[120vh] bg-white  md:w-[35%] rounded-r-full border-r-[20px] border-t-[20px] border-b-[20px] border-[#1b375f] absolute top-[-10vh] left-0 hidden md:flex  justify-center items-center">
        <h1 className="text-[#1b375f] text-[2rem] font-bold">LOGO</h1>
      </div> */}
      <RightNav />
      <div className=" h-[100vh] w-[95%] md:w-[65%] flex flex-col justify-center items-center absolute right-0">
        <h1 className="mb-7 text-[1.2rem] text-[#1b375f] font-bold">
          Quarter 1 Details
        </h1>
        <table className="w-[80%] bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="cursor-pointer">
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Field
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="cursor-pointer hover:bg-gray-200">
              <td className="px-6 py-4 whitespace-nowrap">Name</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {quarter1Data ? quarter1Data.name : "Loading..."}
              </td>
            </tr>
            <tr className="cursor-pointer hover:bg-gray-200">
              <td className="px-6 py-4 whitespace-nowrap">Member</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {quarter1Data ? quarter1Data.members : "Loading..."}
              </td>
            </tr>
            <tr className="cursor-pointer hover:bg-gray-200">
              <td className="px-6 py-4 whitespace-nowrap">Location</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {quarter1Data ? quarter1Data.location : "Loading..."}
              </td>
            </tr>
            <tr className="cursor-pointer hover:bg-gray-200">
              <td className="px-6 py-4 whitespace-nowrap">Budget</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {quarter1Data ? `${quarter1Data.budjet} $` : "Loading..."}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="absolute bottom-9 right-11">
          <Link
            to="/quarter2"
            className="bg-[#1b375f] text-white px-4 py-2 rounded"
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Quarter1Details;
