import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../api/MyUserApi";
import { IoMdLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const AdminNav = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-[200px] lg:w-[240px] h-[100vh] bg-white border-r-[5px] border-[#1B375F] py-6 hidden md:flex flex-col gap-[2rem]">
        <img src={Logo} width="170px" />
        <div className="w-full">
          <button
            onClick={() => navigate("/")}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            Game
          </button>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            Cost Comparison
          </button>
          <button
            onClick={() => navigate("/admin/revenue")}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            Revenue Comparison
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            User List
          </button>
          <button
            onClick={() => navigate("/admin/incomeStatement")}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            Update Income Statement
          </button>
          <button
            onClick={() => navigate("/admin/quarter2")}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            Update Quarter 2
          </button>
        </div>
        <button
          onClick={() => logout()}
          className="w-max px-7 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start flex gap-2 items-center relative mt-auto mx-auto  rounded-full"
        >
          <IoMdLogOut /> Logout
        </button>
      </div>

      <GiHamburgerMenu
        className="md:hidden absolute left-2 top-2 text-[2rem] text-white"
        onClick={() => setOpen(!open)}
      />

      {/* {open && ( */}
      <div
        className={`w-[200px] lg:w-[240px]  h-[100vh] bg-white border-r-[5px] border-[#1B375F] py-2 flex flex-col gap-[2rem] absolute z-10 ${
          !open && `translate-x-[-240px]`
        }  transition-all`}
      >
        <RxCross2
          className="ml-auto mr-2 text-[2rem]"
          onClick={() => setOpen(!open)}
        />
        <img src={Logo} width="170px" />
        <div className="w-full">
          <button
            onClick={() => {
              navigate("/");
              setOpen(!open);
            }}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            Game
          </button>
          <button
            onClick={() => {
              navigate("/admin/dashboard");
              setOpen(!open);
            }}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            Cost Comparison
          </button>
          <button
            onClick={() => {
              navigate("/admin/revenue");
              setOpen(!open);
            }}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            Revenue Comparison
          </button>
          <button
            onClick={() => {
              navigate("/admin/users");
              setOpen(!open);
            }}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            User List
          </button>
          <button
            onClick={() => {
              navigate("/admin/incomeStatement");
              setOpen(!open);
            }}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            Update Income Statement
          </button>
          <button
            onClick={() => {
              navigate("/admin/quarter2");
              setOpen(!open);
            }}
            className="w-full px-2 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start"
          >
            Update Quarter 2
          </button>
        </div>
        <button
          onClick={() => {
            logout();
            setOpen(!open);
          }}
          className="w-max px-7 py-2 bg-[#1B375F] text-white border-b-[2px] border-white text-start flex gap-2 items-center relative mt-auto mx-auto  rounded-full"
        >
          <IoMdLogOut /> Logout
        </button>
      </div>
      {/* )} */}
    </>
  );
};

export default AdminNav;
