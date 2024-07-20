import { useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

export const useGetIncome = () => {
  const getIncomeStatement = async () => {
    const response = await fetch('https://bread-n-butter-backend.vercel.app/api/v1/user/incomeStatement', {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error("Error in Getting Income Statement");
    }

    return await response.json();
  };

  const {
    mutateAsync: getIncome,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getIncomeStatement);

  return { getIncome, isLoading, isSuccess, error };
};

export const useUpdateIncome = () => {
  const updateIncomeStatement = async (data) => {
    // console.log("DATA", data);
    const response = await fetch(
      `https://bread-n-butter-backend.vercel.app/api/v1/editIncomeStatement`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Error in Updating Income Statement");
    }

    return await response.json();
  };

  const {
    mutateAsync: updateIncome,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateIncomeStatement);

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Successfully updated");
  //   }
  // }, [isSuccess]);

  return { updateIncome, isLoading, isSuccess, error };
};

export const useGetUserIncome = () => {
  const { jwt } = useAuthContext();
  const getUserIncomeStatement = async () => {
    const response = await fetch(
      `https://bread-n-butter-backend.vercel.app/api/v1/user/incomeStatement`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error in Getting Income Statement");
    }

    return await response.json();
  };

  const {
    mutateAsync: getUserIncome,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getUserIncomeStatement);

  return { getUserIncome, isLoading, isSuccess, error };
};

export const useCreateUserIncomeStatement = () => {
  const { jwt } = useAuthContext();

  const createUserIncomeStatement = async () => {
    const response = await fetch(
      `https://bread-n-butter-backend.vercel.app/api/v1/user/incomeStatement`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(),
      }
    );
    if (!response.ok) {
      throw new Error("Error in Getting Income Statement");
    }

    return await response.json();
  };

  const {
    mutateAsync: CreateUserIncome,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createUserIncomeStatement);

  return { CreateUserIncome, isLoading, isSuccess, error };
};
