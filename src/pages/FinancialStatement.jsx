import React, { useEffect, useState } from "react";
import FinancialStatementTable from "./FinancialStatementTable";
import { useGetIndividualQuarter1 } from "../api/MyQuarterApi";
import { useGetUserQuarter2 } from "../api/MyQuarter2Api";

const FinancialStatement = () => {
  const [quarters, setQuarters] = useState({
    quarter1: false,
    quarter2: false,
    quarter3: false,
    quarter4: false,
  });

  const [quarter1Info, setQuarter1Info] = useState({
    name: "",
    members: "",
    location: "",
    budjet: 0,
  });
  const [quarter1, setQuarter1] = useState();
  const [quarter2, setQuarter2] = useState();
  const [quarter2Info, setQuarter2Info] = useState();
  const { getIndividualQuarter } = useGetIndividualQuarter1();
  const { UserQuarter2 } = useGetUserQuarter2();

  let quarter1Data, quarter2Data;
  useEffect(() => {
    const loadData = async function () {
      quarter1Data =
        (await JSON.parse(localStorage.getItem("quarter1"))) || null;
      const quarter1D = await getIndividualQuarter();
      const quarter2D = await UserQuarter2();

      setQuarter1(quarter1D.data);
      setQuarter2(quarter2D);
      quarter2Data =
        (await JSON.parse(localStorage.getItem("quarter2"))) || null;

      if (quarter1Data) {
        setQuarters({ ...quarters, quarter1: true });
        setQuarter1Info({ ...quarter1Data });
      }
      if (quarter2Data) {
        setQuarter2Info(quarter2Data);
      }
    };

    loadData();
    console.log(quarter1Info);
  }, []);
  if (quarter1) {
    // console.log("QUARTER 1", quarter1);
  }
  return (
    <div className="bg-[#fbb748] min-h-[100vh] w-[100%]">
      <div>
        <FinancialStatementTable
          quarters={quarters}
          quarter1={quarter1}
          quarter2={quarter2}
          quarter1Data={quarter1Info}
          quarter2Data={quarter2Info}
        />
      </div>
    </div>
  );
};

export default FinancialStatement;
