import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useGetIndividualUserQuarter2 } from "../api/MyQuarter2Api";
import RightNav from "./components/RightNav";
const Quarter2Detail = () => {
  const navigate = useNavigate();
  const [quarter2Data, setQuarter2Data] = useState();
  const [quarter2D, setQuarter2D] = useState();
  const { id } = useParams();
  const { IndividualUserQuarter2 } = useGetIndividualUserQuarter2();
  const [quarters, setQuarters] = useState({
    quarter1: false,
    quarter2: true,
    quarter3: true,
    quarter4: true,
  });
  let quarter1, quarter2, quarter3, quarter4;

  useEffect(() => {
    const loadData = async () => {
      const data = await IndividualUserQuarter2(id);

      console.log(data);
      if (data) {
        setQuarter2D(data);
      }
    };
    loadData();

    // if (quarter2D) {
    //   console.log(quarter2D);
    // }

    quarter3 = localStorage.getItem("quarter3") || false;
    quarter4 = localStorage.getItem("quarter4") || false;

    if (quarter1) {
      setQuarters({ ...quarters, quarter2: false });
    }

    // console.log("quarter1", quarter1);
    // console.log("quarter2", quarter2);
    // console.log("quarter3", quarter3);
    // console.log("quarter4", quarter4);

    if (quarter2) {
      console.log("quarter 2 true");
      setQuarters({
        ...quarters,
        quarter1: false,
        quarter2: false,
        quarter3: false,
      });
      setQuarter2Data(quarter2);
    }
    if (quarter3) {
      setQuarters({
        ...quarters,
        quarter1: false,
        quarter2: false,
        quarter4: false,
      });
    }
    if (quarter4) {
      setQuarters({
        ...quarters,
        quarter1: false,
        quarter2: false,
        quarter3: false,
      });
    }
  }, []);

  const handleNavigation = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue && selectedValue !== "Quarters") {
      navigate(selectedValue);
    }
    console.log(selectedValue);
  };
  return (
    <div className="w-full h-[100vh] flex bg-[#fbb748] relative overflow-hidden">
      <RightNav />
      <div className=" h-[100vh] mx-auto w-[95%] md:w-[65%] flex flex-col justify-center items-center absolute right-0">
        <h1 className="mb-7 text-[1.2rem] text-[#1b375f] font-bold">
          Quarter 2 details
        </h1>

        {quarter2D && (
          <div className="w-[70%] flex flex-col justify-center ">
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
                    {quarter2D && quarter2D.option1.selected ? (
                      <TiTick className="text-green-500 mx-auto text-2xl" />
                    ) : (
                      <RxCross2 className="text-red-500 mx-auto text-2xl" />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option1.cost}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option1.otherCost}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option1.income}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option1.netProfit}
                  </td>
                </tr>
                <tr className="border-b-[2px] border-gray-300 hover:bg-gray-300 cursor-pointer">
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option2.selected ? (
                      <TiTick className="text-green-500 mx-auto text-2xl" />
                    ) : (
                      <RxCross2 className="text-red-500 mx-auto text-2xl" />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option2.cost}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option2.otherCost}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option2.income}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option2.netProfit}
                  </td>
                </tr>
                <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option3.selected ? (
                      <TiTick className="text-green-500 mx-auto text-2xl" />
                    ) : (
                      <RxCross2 className="text-red-500 mx-auto text-2xl" />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option3.cost}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option3.otherCost}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option3.income}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter2D && quarter2D.option3.netProfit}
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
                    {quarter2D && quarter2D.totalProfit}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="hover:bg-gray-300 bg-white rounded mt-3 px-2 py-3 cursor-pointer">
              <strong>Event:</strong> {quarter2D.event}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quarter2Detail;
