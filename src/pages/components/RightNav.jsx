import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../api/MyUserApi";
import logo from "../../assets/Logo.png";
import { IoMdLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useGetIndividualQuarter1 } from "../../api/MyQuarterApi";
import { useGetUserQuarter2 } from "../../api/MyQuarter2Api";

const RightNav = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { getIndividualQuarter } = useGetIndividualQuarter1();
  const { UserQuarter2 } = useGetUserQuarter2();

  const [quarter2, setQuarter2] = useState(true);
  const [quarter1, setQuarter1] = useState(true);

  useEffect(() => {
    let User = JSON.parse(localStorage.getItem("breadUser"));
    if (User) {
      if (User.role === "admin") {
        setIsAdmin(true);
      }
    }

    const loadData = async () => {
      const quarter1D = await getIndividualQuarter();
      const quarter2D = await UserQuarter2();

      if (quarter1D) {
        setQuarter1(false);
      }
      if (quarter2D) {
        setQuarter2(false);
      }
    };

    loadData();
  }, []);
  const handleNavigation = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      setOpen(!open);
      navigate(selectedValue);
    }
  };
  const logoutHandler = () => {
    logout();
    setOpen(!open);
    // console.log("HEllo");
  };

  console.log("OPEN", open);
  return (
    <>
      <div className="h-[120vh] bg-white  md:w-[35%] rounded-r-full border-r-[20px] border-t-[20px] border-b-[20px] border-[#1b375f] absolute top-[-10vh] left-0 hidden md:flex  justify-center items-center">
        <div className="absolute top-[15vh] left-10 flex flex-col gap-1">
          <button
            className="px-2 py-1 bg-[#1b375f]  text-white rounded-full"
            onClick={logoutHandler}
          >
            Logout
          </button>
          <select name="quarters" id="quarters" onChange={handleNavigation}>
            <option>Quarters</option>
            <option value="/quarter1">Quarter1</option>
            <option value="/quarter2" disabled={quarter1}>
              Quarter2
            </option>
            <option value="/quarter3" disabled={quarter2}>
              Quarter3
            </option>
            <option value="/quarter4" disabled={true}>
              Quarter4
            </option>
          </select>
        </div>
        <img src={logo} width="280px" />
        <div className="absolute bottom-[15vh] left-10 flex flex-col gap-3 text-center">
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="py-2 px-3 bg-[#1b375f] text-white rounded-full"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/financialStatement"
            className="py-2 px-3 bg-[#1b375f] text-white rounded-full"
          >
            Financial statement
          </Link>
        </div>
      </div>

      {/* Mobile navbar */}

      <GiHamburgerMenu
        className="mt-3 ml-3 text-white text-[2rem] md:hidden absolute cursor-hover"
        onClick={() => setOpen(!open)}
      />

      <div
        className={`h-[100vh] bg-white  w-[200px] border-r-[10px]  py-5 border-[#1b375f] absolute z-10   md:hidden flex flex-col   items-center ${
          !open && `translate-x-[-240px]`
        } transition-all`}
      >
        <RxCross2
          className="ml-auto mr-2 text-[2rem]"
          onClick={() => setOpen(!open)}
        />
        <img src={logo} width="180px" />
        <div className="w-full mt-4 flex flex-col">
          <button
            className="px-2 py-1 bg-[#1b375f]  text-white border-b-[2px] border-white flex items-center gap-2"
            onClick={logoutHandler}
          >
            <IoMdLogOut className="text-[1rem]" />
            Logout
          </button>
          <select
            name="quarters"
            id="quarters"
            onChange={handleNavigation}
            className="w-full"
          >
            <option>Quarters</option>
            <option value="/quarter1">Quarter1</option>
            <option value="/quarter2" disabled={quarter1}>
              Quarter2
            </option>
            <option value="/quarter3" disabled={quarter2}>
              Quarter3
            </option>
            <option value="/quarter4" disabled={true}>
              Quarter4
            </option>
          </select>
        </div>

        <div className=" mt-auto w-full flex flex-col gap-3 text-start">
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="py-2 px-3 bg-[#1b375f] text-white"
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              navigate("/financialStatement");
              setOpen(!open);
            }}
            className="py-2 px-2 bg-[#1b375f] text-white w-full"
          >
            Financial statement
          </button>
        </div>
      </div>
    </>
  );
};

export default RightNav;
