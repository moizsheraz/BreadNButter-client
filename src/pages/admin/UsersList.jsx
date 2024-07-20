import React, { useEffect, useState } from "react";
import { useGetAllUsers } from "../../api/MyUserApi";
import { Link } from "react-router-dom";
import AdminNav from "../components/AdminNav";

const UsersList = () => {
  const { getAllUser } = useGetAllUsers();
  const [users, setAllUsers] = useState();

  useEffect(() => {
    const loadData = async () => {
      const usersList = await getAllUser();

      if (usersList) {
        setAllUsers(usersList);
      }
    };
    loadData();
  }, []);

  return (
    <div className="w-[100%] h-[100vh] overflow-auto flex">
      <AdminNav />
      <div className="h-[100vh] overflow-auto flex-1">
        <div className="flex-1 min-h-[100vh] bg-[#FBB748] md:py-4 py-[3rem]">
          <h1 className="mx-auto w-[95%] md:w-[85%] bg-white px-2 py-2 rounded font-bold text-center text-[1.4rem]">
            Users
          </h1>
          {users && (
            <div className="w-[95%] md:w-[85%] rounded mx-auto overflow-auto">
              <table className=" bg-white border mb-7 w-[100%]  shadow-md rounded-lg  mt-2">
                <thead>
                  <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300">
                    <th className="py-2 px-4 border-b text-start font-bold">
                      User Name
                    </th>
                    <th className="py-2 px-4 border-b text-start">Email</th>
                    <th className="py-2 px-4 border-b text-start">Details</th>
                  </tr>
                </thead>
                <tbody className="w-[100%]">
                  {users.map((item) => {
                    if (item.role === "admin") return;
                    return (
                      <tr className="hover:bg-gray-300 cursor-pointer border-b-[2px] border-gray-300 w-[100%]">
                        <td className="py-2 px-4 border-b text-start ">
                          {item.name}
                        </td>
                        <td className="py-2 px-4 border-b text-start">
                          {item.email}
                        </td>
                        <td className="py-2 px-4 border-b text-start ">
                          <Link to={`/admin/user/${item._id}`}>Details</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
