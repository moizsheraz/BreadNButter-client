import React, { useEffect, useState } from "react";
import { usecreateQuarter1 } from "../api/MyQuarterApi";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateQuarter2,
  useGetQuarter2,
  useGetUserQuarter2,
} from "../api/MyQuarter2Api";
import RightNav from "./components/RightNav";
import { useCreateUserIncomeStatement } from "../api/MyIncomeStatementApi";

const Quarter2 = () => {
  const navigate = useNavigate();
  const { isSuccess, createQuarter } = usecreateQuarter1();
  const { Quarter2Info } = useGetQuarter2();
  const { CreateQuarter2 } = useCreateQuarter2();
  const { UserQuarter2 } = useGetUserQuarter2();
  const { CreateUserIncome } = useCreateUserIncomeStatement();
  const [quarter2D, setQuarter2D] = useState();

  const [quarters, setQuarters] = useState({
    quarter1: false,
    quarter2: true,
    quarter3: true,
    quarter4: true,
  });

  const handleNavigation = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue && selectedValue !== "Quarters") {
      navigate(selectedValue);
    }
  };

  let quarter1, quarter2, quarter3, quarter4;
  useEffect(() => {
    quarter1 = JSON.parse(localStorage.getItem("quarter1")) || false;
    quarter2 = JSON.parse(localStorage.getItem("quarter2")) || false;
    quarter3 = localStorage.getItem("quarter3") || false;
    quarter4 = localStorage.getItem("quarter4") || false;

    const loadData = async () => {
      const data = await Quarter2Info();
      const userQuarterData = await UserQuarter2();

      if (userQuarterData) {
        navigate(`/quarter2/${userQuarterData._id}`);
        // console.log(userQuarterData);
      }
      if (data) {
        const data1 = data[0];
        if (data1) {
          setQuarter2D(data1);
        }
      }
    };

    loadData();

    if (quarter1) {
      setQuarters({ ...quarters, quarter2: false });
    }

    if (quarter2) {
      setQuarters({
        ...quarters,
        quarter1: false,
        quarter2: false,
        quarter3: false,
      });

      // console.log(quarter2Data);
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

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setQuarter2D((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        selected: checked,
      },
    }));

    // console.log(quarter2D);
  };
  // console.log("QUARTER", quarter2D);

  let netProfit = 5000;
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // CreateQuarter2(quarter2D);
    const data = await CreateQuarter2(quarter2D);
    console.log(quarter2D);

    if (data) {
      CreateUserIncome();
    }

    // console.log("Selected options:", selectedOptions);
    // Handle the selected options further, e.g., send them to a server

    navigate(`/quarter2/${data._id}`);
  };

  return (
    <div className="w-full h-[100vh] flex bg-[#fbb748] relative overflow-hidden">
      <RightNav />
      <div className=" h-[100vh] w-[95%] md:w-[65%] flex flex-col justify-center items-center md:absolute right-0">
        <h1 className="mb-7 text-[1.8rem] text-[#1b375f] font-bold font-mono">
          Quarter 2
        </h1>
        {quarter2D && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[20px] w-[95%]  px-2 py-2 rounded"
          >
            <div className="flex flex-col gap-3">
              <h2 className="mb-2 text-[1.2rem] text-[#1b375f] font-bold">
                Quarterly Opportunities and Events (OE)
              </h2>
              <div
                className={`bg-white rounded px-2 py-2 ${
                  quarter2D.option1.selected && `border-[2px] border-black ml-3`
                }`}
              >
                <input
                  type="checkbox"
                  id="option1"
                  name="option1"
                  checked={quarter2D && quarter2D.option1.selected}
                  onChange={handleChange}
                  className="mr-2 hidden"
                />
                <label htmlFor="option1" className="cursor-pointer">
                  {quarter2D.option1.description}
                </label>
              </div>
              <div
                className={`bg-white rounded px-2 py-2 ${
                  quarter2D.option2.selected && `border-[2px] border-black ml-3`
                }`}
              >
                <input
                  type="checkbox"
                  id="option2"
                  name="option2"
                  checked={quarter2D && quarter2D.option2.selected}
                  onChange={handleChange}
                  className="mr-2 hidden"
                />
                <label htmlFor="option2" className="cursor-pointer">
                  {quarter2D.option2.description}
                </label>
              </div>
              <div
                className={`bg-white rounded px-2 py-2 ${
                  quarter2D.option3.selected && `border-[2px] border-black ml-3`
                }`}
              >
                <input
                  type="checkbox"
                  id="option3"
                  name="option3"
                  checked={quarter2D && quarter2D.option3.selected}
                  onChange={handleChange}
                  className="mr-2 hidden"
                />
                <label htmlFor="option3" className="cursor-pointer">
                  {quarter2D.option3.description}
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#1b375f] text-white px-4 py-2 rounded ml-auto"
              style={{ width: "max-content" }}
            >
              Save
            </button>
          </form>
        )}
        {/* <form action="" className="flex flex-col gap-[20px] w-[80%]">
          <div>
            <h2 className="mb-2 text-[1.2rem] text-[#1b375f] font-bold">
              Quarterly Opportunities and Events (OE)
            </h2>
            <div>
              <input
                type="checkbox"
                id="option1"
                name="option1"
                className="mr-2"
              />
              <label htmlFor="option1" name="option1">
                Market Stall (regular Sat) - £250 month/time commitment extra
                ingredients cost 160
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="option2"
                name="option2"
                className="mr-2"
              />
              <label htmlFor="option2" name="option2">
                Short dated goods - job lot cost £450
              </label>
            </div>
            <div>
              <input type="checkbox" id="option3" name="3" className="mr-2" />
              <label htmlFor="option3" name="3">
                Special Deal! Marketing - leaflets and branded stickers worth
                £800 sale for £350
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#1b375f] rounded-full py-2 px-4 text-white font-bold text-[1.2rem] w-[90%]"
            style={{ width: "max-content" }}
          >
            Save
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Quarter2;
