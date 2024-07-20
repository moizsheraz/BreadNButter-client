import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetIndividualQuarter1Admin,
  useGetIndividualQuarter2Admin,
} from "../../api/MyQuarterApi";

import AdminNav from "../components/AdminNav";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const UserDetails = () => {
  const { getIndividualQuarterAdmin } = useGetIndividualQuarter1Admin();
  const [quarter1Data, setQuarter1Data] = useState();
  const [quarter2, setQuarter2] = useState();
  const { getQuarter2Admin } = useGetIndividualQuarter2Admin();
  const { id } = useParams();
  useEffect(() => {
    const loadData = async () => {
      const data = await getIndividualQuarterAdmin(id);
      const quarter2D = await getQuarter2Admin(id);
      // console.log("HEllo", quarter2D);

      if (data) {
        console.log(data);
        setQuarter1Data(data.data);
      }
      if (quarter2D) {
        // console.log(quarter2D);
        setQuarter2(quarter2D.data);
      }
    };

    loadData();
  }, []);

  return (
    <div className="w-[100%] h-[100vh] overflow-auto flex">
      <AdminNav />
      <div className="h-[100vh] overflow-auto flex-1">
        <div className=" w-[100%] min-h-[100vh] bg-[#FBB748] md:py-4 py-[3rem]">
          <h1 className="mx-auto w-[95%] md:w-[85%] bg-white px-2 py-2 rounded font-bold text-center text-[1.4rem]">
            Quarters Details
          </h1>
          {quarter1Data === undefined && (
            <div className="w-[95%] md:w-[85%] mx-auto mb-3 min-h-[200px] bg-[#ffffff31] flex justify-center items-center">
              <p className="text-center text-[1.4rem]">
                Quarter1 goes here when user fill it...
              </p>
            </div>
          )}
          {quarter1Data && (
            <div className="w-[95%] md:w-[85%] rounded mx-auto overflow-auto">
              <h1 className=" w-[100%] bg-white px-2 py-2 mt-3 rounded font-bold  text-[1.4rem]">
                Quarter1 Details
              </h1>
              <table className=" bg-white border mb-7 w-[100%]  shadow-md rounded-lg">
                <thead>
                  <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                    <th className="py-2 px-4 border-b text-start">Key</th>
                    <th className="py-2 px-4 border-b text-start">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                    <td className="py-2 px-4 border-b text-start">Name</td>
                    <td className="py-2 px-4 border-b text-start">
                      {quarter1Data.name}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                    <td className="py-2 px-4 border-b text-start">Members</td>
                    <td className="py-2 px-4 border-b text-start">
                      {quarter1Data.members}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                    <td className="py-2 px-4 border-b text-start">Location</td>
                    <td className="py-2 px-4 border-b text-start">
                      {quarter1Data.location}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                    <td className="py-2 px-4 border-b text-start">Budget</td>
                    <td className="py-2 px-4 border-b text-start">
                      {quarter1Data.budjet}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {quarter2 === undefined && (
            <div className="w-[95%] md:w-[85%] mx-auto min-h-[200px] bg-[#ffffff31] flex justify-center items-center">
              <p className="text-center text-[1.4rem]">
                Quarter2 goes here when user fill it...
              </p>
            </div>
          )}

          {quarter2 && (
            <div className=" w-[95%] md:w-[85%] mx-auto  ">
              <h1 className=" w-[100%] bg-white px-2 py-2 mt-3 rounded font-bold  text-[1.4rem]">
                Quarter2 Details
              </h1>
              <table className="min-w-full bg-white border  shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="py-2 px-3 md:px-4 border-b">Selected</th>
                    <th className="py-2 px-3 md:px-4 border-b">Cost</th>
                    <th className="py-2 px-3 md:px-4 border-b">Other Cost</th>
                    <th className="py-2 px-3 md:px-4 border-b">Income</th>
                    <th className="py-2 px-3 md:px-4 border-b">Net Profit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-[2px] border-gray-300 hover:bg-gray-300 cursor-pointer">
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option1.selected ? (
                        <TiTick className="text-green-500 mx-auto text-2xl" />
                      ) : (
                        <RxCross2 className="text-red-500 mx-auto text-2xl" />
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option1.cost}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option1.otherCost}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option1.income}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option1.netProfit}
                    </td>
                  </tr>
                  <tr className="border-b-[2px] border-gray-300 hover:bg-gray-300 cursor-pointer">
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option2.selected ? (
                        <TiTick className="text-green-500 mx-auto text-2xl" />
                      ) : (
                        <RxCross2 className="text-red-500 mx-auto text-2xl" />
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option2.cost}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option2.otherCost}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option2.income}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option2.netProfit}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option3.selected ? (
                        <TiTick className="text-green-500 mx-auto text-2xl" />
                      ) : (
                        <RxCross2 className="text-red-500 mx-auto text-2xl" />
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option3.cost}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option3.otherCost}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option3.income}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quarter2 && quarter2.option3.netProfit}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-300 cursor-pointer">
                    <td className="py-2 px-4 border-b text-center col-span-3">
                      {null}
                    </td>
                    <td className="py-2 px-4 border-b text-center col-span-3">
                      {null}
                    </td>
                    <td className="py-2 px-4 border-b text-center col-span-3">
                      {null}
                    </td>
                    <td className="py-2 px-4 border-b text-center col-span-3">
                      {null}
                    </td>
                    <td className="py-2 px-4 border-b text-center col-span-3">
                      {quarter2 && quarter2.totalProfit}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="hover:bg-gray-300  px-2 py-2 rounded bg-white cursor-pointer">
                <strong>Event:</strong> {quarter2.event}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
