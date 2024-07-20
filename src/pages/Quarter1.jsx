import React, { useEffect, useState } from "react";
import {
  usecreateQuarter1,
  useGetIndividualQuarter1,
} from "../api/MyQuarterApi";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../api/MyUserApi";
import { useAuthContext } from "../../context/AuthContext";
import RightNav from "./components/RightNav";
import { useCreateUserIncomeStatement } from "../api/MyIncomeStatementApi";

const Quarter1 = () => {
  const navigate = useNavigate();
  const { isSuccess, createQuarter } = usecreateQuarter1();
  const { getIndividualQuarter, isSuccess: individualQuarterSuccess } =
    useGetIndividualQuarter1();
  // const { createUserIncome } = useCreateUserIncomeStatement();
  // const [jwt, setJwt] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const { logout } = useLogout();
  const [inputs, setInputs] = useState({
    name: "",
    members: "",
    location: "",
  });

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

  let User, quarter1, quarter2, quarter3, quarter4;
  useEffect(() => {
    const loadData = async () => {
      const data = await getIndividualQuarter();

      if (data) {
        // console.log(data);
        navigate(`/quarter1/${data.data._id}`);
      }
    };

    loadData();

    quarter1 = JSON.parse(localStorage.getItem("quarter1")) || false;

    quarter2 = localStorage.getItem("quarter2") || false;
    quarter3 = localStorage.getItem("quarter3") || false;
    quarter4 = localStorage.getItem("quarter4") || false;

    User = JSON.parse(localStorage.getItem("breadUser"));
    if (User) {
      if (User.role === "admin") {
        setIsAdmin(true);
      }
    }

    // if (quarter1) {
    //   setInputs({
    //     name: quarter1.name,
    //     members: quarter1.members,
    //     location: quarter1.location,
    //   });
    //   setQuarters({ ...quarters, quarter2: false });
    // }

    if (quarter2) {
      setQuarters({
        ...quarters,
        quarter1: false,
        quarter2: false,
        quarter3: false,
      });
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

  const submitHandler = async (e) => {
    e.preventDefault();

    // console.log(jwt);

    const quarter = await createQuarter(inputs);

    // if (quarter1) {
    //   createUserIncome();
    // }

    const quarter1Id = quarter.data._id;

    localStorage.setItem(
      "quarter1",
      JSON.stringify({ ...quarter.data, budjet: 5000 })
    );

    navigate(`/quarter1/${quarter1Id}`);
  };

  const logoutHandler = () => {
    logout();
    console.log("HEllo");
  };

  return (
    <div className="w-full h-[100vh] flex bg-[#fbb748] relative overflow-hidden">
      <RightNav />

      <div className=" h-[100vh] w-[100%] md:w-[65%] flex flex-col justify-center items-center md:absolute right-0">
        <h1 className="mb-7 text-[1.8rem] text-[#1b375f] font-bold font-mono">
          Quarter 1
        </h1>
        <form
          action=""
          onSubmit={submitHandler}
          className="flex flex-col gap-[20px] w-[95%] md:w-[80%]  px-2 py-2"
        >
          <div className="flex gap-5 items-center">
            <label
              htmlFor="name"
              className="font-bold text-[#1b375f] text-[1.2rem] w-[80px]"
            >
              Name:
            </label>
            <input
              type="name"
              placeholder="Enter your Team Name"
              id="name"
              required
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              className="rounded-full py-3 px-4 w-[75%] border-none outline-none text-center placeholder:text-gray placeholder:font-bold"
            />
          </div>
          <div className="flex gap-5 items-center">
            <label
              htmlFor="members"
              className="font-bold text-[#1b375f] text-[1.2rem] w-[80px]"
            >
              Members:
            </label>
            <input
              type="members"
              placeholder="Enter number Of your Team member"
              id="members"
              required
              value={inputs.members}
              onChange={(e) =>
                setInputs({ ...inputs, members: e.target.value })
              }
              className="rounded-full py-3 px-4 w-[75%] border-none outline-none text-center placeholder:text-gray placeholder:font-bold"
            />
          </div>
          <div className="flex gap-5 items-center">
            <label
              htmlFor="location"
              className="font-bold text-[#1b375f] text-[1.2rem] w-[80px]"
            >
              Location:
            </label>
            <input
              type="location"
              id="location"
              required
              placeholder="Enter Your Location"
              value={inputs.location}
              onChange={(e) =>
                setInputs({ ...inputs, location: e.target.value })
              }
              className="rounded-full py-3 px-4 w-[75%] border-none outline-none text-center placeholder:text-gray placeholder:font-bold"
            />
          </div>
          <div className="text-[#1b375f] text-center">
            *Budjet for this project is 5000$
          </div>
          <button
            type="submit"
            className="bg-[#1b375f] rounded-full py-2 px-6 text-white font-bold text-[1.2rem] w-[90%] ml-auto"
            style={{ width: "max-content" }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quarter1;
