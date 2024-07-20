import { useMutation } from "react-query";
import { useAuthContext } from "../../context/AuthContext";

export const useGetQuarter2 = () => {
  const { jwt } = useAuthContext();
  const getQuarter2Info = async () => {
    const response = await fetch(`http://localhost:7000/api/v1/quarter2`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error in Getting quarter 2");
    }

    return await response.json();
  };

  const {
    mutateAsync: Quarter2Info,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getQuarter2Info);

  return { Quarter2Info, isLoading, isSuccess, error };
};

export const useUpdateQuarter2 = () => {
  const { jwt } = useAuthContext();
  const updateQuarter2Info = async (data) => {
    const response = await fetch(
      `http://localhost:7000/api/v1/admin/updateQuarter2`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Error in Updating quarter 2");
    }

    return await response.json();
  };

  const {
    mutateAsync: UpdateQuarter2,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateQuarter2Info);

  return { UpdateQuarter2, isLoading, isSuccess, error };
};

export const useCreateQuarter2 = () => {
  const { jwt } = useAuthContext();
  const createQuarter2Info = async (data) => {
    const response = await fetch(`http://localhost:7000/api/v1/quarter2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error in Getting quarter 2");
    }

    return await response.json();
  };

  const {
    mutateAsync: CreateQuarter2,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createQuarter2Info);

  return { CreateQuarter2, isLoading, isSuccess, error };
};

export const useGetUserQuarter2 = () => {
  const { jwt } = useAuthContext();
  const getUserQuarter2 = async () => {
    const response = await fetch(
      `http://localhost:7000/api/v1/quarter2/quarter2Details`,
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
    mutateAsync: UserQuarter2,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getUserQuarter2);

  return { UserQuarter2, isLoading, isSuccess, error };
};

export const useGetIndividualUserQuarter2 = () => {
  const { jwt } = useAuthContext();
  const getIndividualUserQuarter2 = async (id) => {
    // console.log("ID");
    const response = await fetch(
      `http://localhost:7000/api/v1/quarter2/quarter2Details/${id}`,
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
    mutateAsync: IndividualUserQuarter2,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getIndividualUserQuarter2);

  return { IndividualUserQuarter2, isLoading, isSuccess, error };
};
