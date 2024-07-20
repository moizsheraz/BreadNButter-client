import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useGetIncome, useGetUserIncome } from "../api/MyIncomeStatementApi";
import RightNav from "./components/RightNav";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const MyComponent = ({
  quarters,
  quarter1Data,
  quarter2Data,
  quarter1,
  quarter2,
}) => {
  const { getIncome } = useGetIncome();
  const { getUserIncome } = useGetUserIncome();
  const [incomeStatement, setIncomeStatement] = useState();
  const [incomeStatementData, setIncomeStatementData] = useState([]);
  const [incomeStatementD, setIncomeStatementD] = useState();
  const navigate = useNavigate();

  // console.log(quarter2Data);
  let quarter3Data = false;
  let opportunities = 0;
  if (quarter2Data) {
    if (quarter2Data.option1.selected) {
      opportunities += quarter2Data.option1.income;
    }
    if (quarter2Data.option2.selected) {
      opportunities += quarter2Data.option2.income;
    }
    if (quarter2Data.option3.selected) {
      opportunities += quarter2Data.option3.income;
    }
    // console.log("opportunities", opportunities);
    // console.log(quarter2Data.option1.selected);
  }
  console.log("QUARTER2", quarter2);
  let income;
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        income = await getIncome();
        let incomeD = await getUserIncome();

        setIncomeStatementD(incomeD.income);

        setIncomeStatement(income);
      } catch (error) {
        console.error("Error fetching Income data:", error);
      }
    };

    fetchIncomeData();
  }, []);

  if (incomeStatementD) {
    console.log("NEWW", incomeStatementD);
  }

  const headers = [
    { label: "", key: "field" },
    { label: "Quarter 1", key: "value" },
    { label: "Extra 1", key: "value1" },
    { label: "Extra 2", key: "value2" },
    { label: "Extra 3", key: "value3" },
  ];

  // Define the data structure to match the table layout
  const data = [
    {
      field: "Team Name",
      value: quarter1Data.name,
      value1: "checking",
      value2: "checking",
      value3: "checking",
    },
    { field: "No. of members", value: quarter1Data.members },
    { field: "Location", value: quarter1Data.location },
    { field: "Budget", value: quarter1Data.budjet },
  ];

  return (
    <div>
      <div className="md:hidden block">
        <RightNav />
      </div>
      <div className="hidden md:block pt-6 ml-4">
        <button onClick={() => navigate("/quarter1")}>
          <IoArrowBack className="text-black text-[2rem] " />
        </button>
      </div>
      {quarter1 === undefined && (
        <div className="md:py-4 py-[4rem]">
          <div className="w-[95%] md:w-[85%] mx-auto mb-3 min-h-[200px] bg-[#ffffff31] flex justify-center items-center">
            <p className="text-center text-[1.4rem]">
              Financial Statement goes here when you fill quarters...
            </p>
          </div>
        </div>
      )}
      {quarter1 && (
        <div className="w-[100%] flex flex-col gap-1 justify-center items-center md:mx-auto pt-4">
          <div className="mt-7">
            <h1 className="font-bold pt-4 text-[1.4rem]">
              Financial Statement
            </h1>
          </div>

          <div className="md:w-[70%] w-[95%] mx-auto">
            <div className="w-[100%] mx-auto py-2 px-3 md:px-4 bg-white rounded font-bold flex gap-3">
              Quarter 1 :
            </div>
            <table className="w-[100%] bg-white border  shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-300">
                <tr>
                  <th className="py-2 px-3 md:px-4 border-b">Name</th>
                  <th className="py-2 px-3 md:px-4 border-b">Members</th>
                  <th className="py-2 px-3 md:px-4 border-b">Location</th>
                  <th className="py-2 px-3 md:px-4 border-b">Budget</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-[2px] border-gray-300 hover:bg-gray-300 cursor-pointer">
                  <td className="py-2 px-4 border-b text-center">
                    {quarter1 && quarter1.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter1 && quarter1.members}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter1 && quarter1.location}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {quarter1 && quarter1.budjet} $
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {quarter2 && (
            <div className="w-[95%] md:w-[70%]">
              <div className="w-[100%] mx-auto py-2 px-3 md:px-4 bg-white rounded font-bold flex gap-3">
                Quarter 2 :
              </div>
              <table className="w-[100%] bg-white border  shadow-md rounded-lg overflow-hidden">
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
                  <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                    <td className="py-2 px-4 border-b text-center ">{null}</td>
                    <td className="py-2 px-4 border-b text-center ">{null}</td>
                    <td className="py-2 px-4 border-b text-center ">{null}</td>
                    <td className="py-2 px-4 border-b text-center ">{null}</td>

                    <td className="py-2 px-4 border-b text-center ">
                      {quarter2 && quarter2.totalProfit}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="hover:bg-gray-300 cursor-pointer w-[100%] mx-auto py-2 px-3 md:px-4 bg-white rounded  flex gap-3">
                <strong>Event:</strong> {quarter2.event}
              </div>
            </div>
          )}

          {incomeStatementD && (
            <div className="w-[100%]">
              <table className="w-[70%] mx-auto bg-white border mb-7   shadow-md rounded-lg overflow-hidden">
                <div className="px-4 py-2 font-bold">Income Statement:</div>
                <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                  <td className="py-2 px-4 border-b text-center">{null}</td>
                  <td className="py-2 px-4 border-b text-center font-bold">
                    Q2
                  </td>
                  <td className="py-2 px-4 border-b text-center font-bold">
                    Q3
                  </td>
                  <td className="py-2 px-4 border-b text-center font-bold">
                    Q4
                  </td>
                  <td className="py-2 px-4 border-b text-center font-bold">
                    Q5
                  </td>
                </tr>
                <div className="px-1  py-2 font-bold ">Revenues:</div>

                {
                  incomeStatementD && (
                    // incomeStatementData[0].map((item, index) => (
                    <>
                      {Object.entries(incomeStatementD[0].Revenues).map(
                        ([key, value]) => (
                          <tr
                            key={key}
                            className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300"
                          >
                            <td
                              className={`px-4 py-2 ${
                                key === "Total Revenue" ? `font-bold px-1` : ``
                              }`}
                            >
                              {key}
                            </td>
                            {/* <td className="border px-4 py-2">{value}</td> */}
                            {/* {incomeStatementData.map((item, index) => (
                              <td
                                className={`py-2 px-0 md:px-4 border-b text-center ${
                                  key === "Total Revenue"
                                    ? `font-bold px-1`
                                    : ``
                                }`}
                              >
                                {incomeStatementData[index].Revenues[key]}
                                {incomeData[index].Revenues[key]}
                              </td>
                            ))} */}
                            {incomeStatementD.map((item, index) => {
                              // if (index === 0) {
                              return (
                                <>
                                  {incomeStatementD && (
                                    <>
                                      <td
                                        className={`py-2 px-4 border-b text-center ${
                                          item.Revenue < 0 ? `text-red-500` : ""
                                        } ${
                                          key === "Total Cost And Expenses"
                                            ? `font-bold`
                                            : ``
                                        }`}
                                      >
                                        {item["Revenues"][key]}
                                      </td>
                                    </>
                                  )}
                                </>
                              );
                              // }
                            })}
                            {/* {incomeStatementD.map((item, index) => {
                              return (
                                <>
                                  {incomeStatementD && (
                                    <>
                                      <td
                                        className={`py-2 px-4 border-b text-center ${
                                          item.Revenue < 0 ? `text-red-500` : ""
                                        } ${
                                          key === "Total Revenue"
                                            ? `font-bold`
                                            : ``
                                        }`}
                                      >
                                        {incomeStatementD[index].Revenues[key]}
                                      </td>
                                    </>
                                  )}
                                </>
                              );
                            })} */}
                          </tr>
                        )
                      )}
                      <div className="px-1 py-2 font-bold">
                        Expenses And Costs:
                      </div>
                      {Object.entries(
                        incomeStatementD[0]["Expenses And Costs"]
                      ).map(([key, value]) => (
                        <tr
                          key={key}
                          className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300"
                        >
                          <td
                            className={`px-4 py-2 ${
                              key === "Total Cost And Expenses"
                                ? `font-bold px-1`
                                : ``
                            }`}
                          >
                            {key}
                          </td>
                          {incomeStatementD.map((item, index) => (
                            <td
                              className={`py-2 px-4 border-b text-center ${
                                key === "Total Cost And Expenses"
                                  ? `font-bold px-1`
                                  : ``
                              }`}
                            >
                              {item["Expenses And Costs"][key]}
                            </td>
                          ))}
                        </tr>
                      ))}

                      {Object.entries(incomeStatementD[0]).map(
                        ([key, value]) => {
                          if (
                            key === "Revenues" ||
                            key === "Expenses And Costs" ||
                            key === "_id"
                          ) {
                            return null;
                          }
                          return (
                            <tr
                              key={key}
                              className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300"
                            >
                              <td
                                className={`py-2 px-4 border-b ${
                                  key === "EBITIDA" ||
                                  key === "EBIT" ||
                                  key === "PRETAX INCOME" ||
                                  key === "NET INCOME"
                                    ? `font-bold px-1`
                                    : ``
                                }`}
                              >
                                {key}
                              </td>
                              {incomeStatementD.map((item, index) => (
                                <td
                                  className={`py-2 px-4 border-b text-center ${
                                    item[key] < 0 ? `text-red-500` : ""
                                  } ${
                                    key === "EBITIDA" ||
                                    key === "EBIT" ||
                                    key === "PRETAX INCOME" ||
                                    key === "NET INCOME"
                                      ? `font-bold`
                                      : ``
                                  }`}
                                >
                                  {item[key]}
                                </td>
                              ))}
                            </tr>
                          );
                        }
                      )}
                    </>
                  )
                  // ))
                }
              </table>
            </div>
          )}

          {incomeStatementD && (
            <div className="w-[95%] md:w-[70%] mx-auto">
              <table className="w-[100%] mx-auto bg-white border mb-7   shadow-md rounded-lg overflow-hidden">
                <div className="px-4 py-2 font-bold">Cash Flow</div>
                <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                  <td className="py-2 px-4 border-b text-center">{null}</td>
                  <td className="py-2 px-4 border-b text-center font-bold">
                    Month 1
                  </td>
                  <td className="py-2 px-4 border-b text-center font-bold">
                    Month 2
                  </td>
                  <td className="py-2 px-4 border-b text-center font-bold">
                    Month 3
                  </td>
                </tr>
                <div className="px-4 py-2 font-bold">Revenues:</div>

                {
                  incomeStatementD && (
                    // incomeStatementData[0].map((item, index) => (
                    <>
                      {Object.entries(incomeStatementD[0].Revenues).map(
                        ([key, value]) => (
                          <tr
                            key={key}
                            className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300"
                          >
                            <td className=" px-4 py-2">{key}</td>
                            {/* <td className="border px-4 py-2">{value}</td> */}
                            {incomeStatementD.map((item, index) => {
                              return (
                                <>
                                  {/* {quarter2Data && index === 0 && ( */}
                                  <>
                                    <td className="px-4 py-2 text-center">
                                      {Math.floor(
                                        incomeStatementD[index].Revenues[key] /
                                          3
                                      )}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                      {Math.floor(
                                        incomeStatementD[index].Revenues[key] /
                                          3
                                      )}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                      {incomeStatementD[index].Revenues[key] -
                                        Math.floor(
                                          incomeStatementD[index].Revenues[
                                            key
                                          ] / 3
                                        ) -
                                        Math.floor(
                                          incomeStatementD[index].Revenues[
                                            key
                                          ] / 3
                                        )}
                                    </td>
                                    {/* <td className="px-4 py-2 text-center">
                                          {Math.ceil(
                                            incomeStatementData[index].Revenues[
                                              key
                                            ] / 3
                                          )}
                                        </td> */}
                                  </>
                                  {/* )} */}
                                </>
                              );
                              // }
                            })}
                          </tr>
                        )
                      )}
                      <div className="px-4 py-2 font-bold">
                        Total Expenses And Costs:
                      </div>

                      {Object.entries(
                        incomeStatementD[0]["Expenses And Costs"]
                      ).map(([key, value]) => (
                        <tr
                          key={key}
                          className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300"
                        >
                          <td className=" px-4 py-2">{key}</td>
                          {/* <td className="border px-4 py-2">{value}</td> */}
                          {incomeStatementD.map((item, index) => {
                            // if (index === 0) {
                            return (
                              <>
                                <td
                                  className={`py-2 px-4 border-b text-center ${
                                    item.Revenue < 0 ? `text-red-500` : ""
                                  }`}
                                >
                                  {Math.floor(
                                    incomeStatementD[index][
                                      "Expenses And Costs"
                                    ][key] / 3
                                  )}
                                </td>
                                <td
                                  className={`py-2 px-4 border-b text-center ${
                                    item.Revenue < 0 ? `text-red-500` : ""
                                  }`}
                                >
                                  {Math.floor(
                                    incomeStatementD[index][
                                      "Expenses And Costs"
                                    ][key] / 3
                                  )}
                                </td>
                                {/* <td
                                        className={`py-2 px-4 border-b text-center ${
                                          item.Revenue < 0 ? `text-red-500` : ""
                                        }`}
                                      >
                                        {Math.ceil(
                                          incomeStatementData[index][
                                            "Expenses And Costs"
                                          ][key] / 3
                                        )}
                                      </td> */}
                                <td
                                  className={`py-2 px-4 border-b text-center ${
                                    item.Revenue < 0 ? `text-red-500` : ""
                                  }`}
                                >
                                  {
                                    incomeStatementD[index][
                                      "Expenses And Costs"
                                    ][key] -
                                      Math.floor(
                                        incomeStatementD[index][
                                          "Expenses And Costs"
                                        ][key] / 3
                                      ) -
                                      Math.floor(
                                        incomeStatementD[index][
                                          "Expenses And Costs"
                                        ][key] / 3
                                      )

                                    // incomeStatementData[index][ "Expenses And Costs" ][key]
                                  }
                                </td>
                              </>
                            );
                            // }
                          })}
                        </tr>
                      ))}
                      {/* Cash Flow Extra Table */}
                      <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300 font-bold">
                        <td className={`py-2 px-4 border-b text-start`}>
                          Income at start
                        </td>
                        <td className={`py-2 px-4 border-b text-center`}>
                          350
                        </td>
                        <td
                          className={`py-2 px-4 border-b text-center ${
                            350 +
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) <
                            0
                              ? `text-red-500`
                              : ``
                          }`}
                        >
                          {350 +
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            Math.floor(
                              incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] / 3
                            )}
                        </td>
                        <td
                          className={`py-2 px-4 border-b text-center ${
                            350 +
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) +
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) <
                            0
                              ? `text-red-500`
                              : ``
                          }`}
                        >
                          {350 +
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            Math.floor(
                              incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] / 3
                            ) +
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            Math.floor(
                              incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] / 3
                            )}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300 font-bold">
                        <td className={`py-2 px-4 border-b text-start`}>
                          Profit (Loss)
                        </td>

                        <td
                          className={`py-2 px-4 border-b text-center ${
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) <
                            0
                              ? `text-red-500`
                              : ``
                          }`}
                        >
                          {Math.floor(
                            incomeStatementD[0].Revenues["Total Revenue"] / 3
                          ) -
                            Math.floor(
                              incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] / 3
                            )}
                        </td>
                        <td
                          className={`py-2 px-4 border-b text-center ${
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) <
                            0
                              ? `text-red-500`
                              : ``
                          }`}
                        >
                          {Math.floor(
                            incomeStatementD[0].Revenues["Total Revenue"] / 3
                          ) -
                            Math.floor(
                              incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] / 3
                            )}
                        </td>
                        <td
                          className={`py-2 px-4 border-b text-center ${
                            incomeStatementD[0].Revenues["Total Revenue"] -
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              (incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] -
                                Math.floor(
                                  incomeStatementD[0]["Expenses And Costs"][
                                    "Total Cost And Expenses"
                                  ] / 3
                                ) -
                                Math.floor(
                                  incomeStatementD[0]["Expenses And Costs"][
                                    "Total Cost And Expenses"
                                  ] / 3
                                )) <
                            0
                              ? `text-red-500`
                              : ``
                          }`}
                        >
                          {incomeStatementD[0].Revenues["Total Revenue"] -
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            (incomeStatementD[0]["Expenses And Costs"][
                              "Total Cost And Expenses"
                            ] -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ))}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300 font-bold">
                        <td className={`py-2 px-4 border-b text-start`}>
                          Income At end
                        </td>

                        <td
                          className={`py-2 px-4 border-b text-center ${
                            350 +
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) <
                            0
                              ? `text-red-500`
                              : ``
                          }`}
                        >
                          {350 +
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            Math.floor(
                              incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] / 3
                            )}
                        </td>
                        <td
                          className={`py-2 px-4 border-b text-center ${
                            350 +
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) +
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) <
                            0
                              ? `text-red-500`
                              : ``
                          }`}
                        >
                          {350 +
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            Math.floor(
                              incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] / 3
                            ) +
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            Math.floor(
                              incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] / 3
                            )}
                        </td>
                        <td
                          className={`py-2 px-4 border-b text-center ${
                            350 +
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) +
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) +
                              incomeStatementD[0].Revenues["Total Revenue"] -
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              Math.floor(
                                incomeStatementD[0].Revenues["Total Revenue"] /
                                  3
                              ) -
                              (incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] -
                                Math.floor(
                                  incomeStatementD[0]["Expenses And Costs"][
                                    "Total Cost And Expenses"
                                  ] / 3
                                ) -
                                Math.floor(
                                  incomeStatementD[0]["Expenses And Costs"][
                                    "Total Cost And Expenses"
                                  ] / 3
                                )) <
                            0
                              ? `text-red-500`
                              : ``
                          }`}
                        >
                          {350 +
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            Math.floor(
                              incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] / 3
                            ) +
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            Math.floor(
                              incomeStatementD[0]["Expenses And Costs"][
                                "Total Cost And Expenses"
                              ] / 3
                            ) +
                            incomeStatementD[0].Revenues["Total Revenue"] -
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            Math.floor(
                              incomeStatementD[0].Revenues["Total Revenue"] / 3
                            ) -
                            (incomeStatementD[0]["Expenses And Costs"][
                              "Total Cost And Expenses"
                            ] -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ) -
                              Math.floor(
                                incomeStatementD[0]["Expenses And Costs"][
                                  "Total Cost And Expenses"
                                ] / 3
                              ))}
                        </td>
                      </tr>
                    </>
                  )
                  // ))
                }
              </table>
            </div>
          )}

          {/* <CSVLink
            data={data}
            headers={headers}
            filename={"quarter1_info.csv"}
            className="btn btn-primary bg-green-600 px-3 text-white rounded py-2 absolute top-4 right-5"
          >
            Export CSV
          </CSVLink> */}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
