import React from "react";
import AdminNav from "../components/AdminNav";
import IncomeChart from "../component/IncomeChart";

const Dashboard = () => {
  return (
    <div className="w-[100%] h-[100vh] overflow-auto flex">
      <AdminNav />
      <div className="h-[100vh] overflow-auto flex-1">
        <IncomeChart />
      </div>
    </div>
  );
};

export default Dashboard;
