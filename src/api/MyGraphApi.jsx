import { useMutation } from "react-query";
import { useAuthContext } from "../../context/AuthContext";

export const useGetGraphData = () => {
  const { jwt } = useAuthContext();

  const getGraphData = async () => {
    const response = await fetch(
      `https://bread-n-butter-backend.vercel.app/api/v1/admin/incomeStatement`,
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
    mutateAsync: getData,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getGraphData);

  return { getData, isLoading, isSuccess, error };
};
