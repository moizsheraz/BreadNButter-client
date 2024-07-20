import { useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

export const usecreateQuarter1 = () => {
  const { jwt } = useAuthContext();
  // console.log(jwt);
  const createQuarter1 = async (data) => {
    // console.log(data);
    const response = await fetch("http://localhost:7000/api/v1/quarter1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error in saving quarter 1");
    }

    return await response.json();
  };

  const {
    mutateAsync: createQuarter,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createQuarter1);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Quarter 1 saved Successfully");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  return { createQuarter, isLoading, isSuccess, error };
};

export const useGetQuarter1 = () => {
  const getQuarter1Details = async (id) => {
    const response = await fetch(`http://localhost:7000/api/v1/quarter1/${id}`);
    if (!response.ok) {
      throw new Error("Error in Getting quarter 1");
    }

    return await response.json();
  };

  const {
    mutateAsync: getQuarter1,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getQuarter1Details);

  return { getQuarter1, isLoading, isSuccess, error };
};

export const useGetIndividualQuarter1 = () => {
  const { jwt } = useAuthContext();
  const getIndividualQuarter1 = async () => {
    const response = await fetch(`http://localhost:7000/api/v1/quarter1`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error in Getting quarter 1");
    }

    return await response.json();
  };

  const {
    mutateAsync: getIndividualQuarter,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getIndividualQuarter1);

  return { getIndividualQuarter, isLoading, isSuccess, error };
};

export const useGetIndividualQuarter1Admin = () => {
  const { jwt } = useAuthContext();
  const getIndividualQuarter1Admin = async (id) => {
    const response = await fetch(
      `http://localhost:7000/api/v1/admin/getIndividualQuarter1/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error in Getting quarter 1");
    }

    return await response.json();
  };

  const {
    mutateAsync: getIndividualQuarterAdmin,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getIndividualQuarter1Admin);

  return { getIndividualQuarterAdmin, isLoading, isSuccess, error };
};

export const useGetIndividualQuarter2Admin = () => {
  const { jwt } = useAuthContext();
  const getIndividualQuarter2Admin = async (id) => {
    const response = await fetch(
      `http://localhost:7000/api/v1/admin/getIndividualQuarter2/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error in Getting quarter 2");
    }

    return await response.json();
  };

  const {
    mutateAsync: getQuarter2Admin,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getIndividualQuarter2Admin);

  return { getQuarter2Admin, isLoading, isSuccess, error };
};
