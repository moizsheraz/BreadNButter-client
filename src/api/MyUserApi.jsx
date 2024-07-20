import { useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useCreateMyUser = () => {
//   const { setAuthUser } = useAuthContext();
//   const createMyUserRequest = async (user) => {
//     console.log("USERRRRRR", user);
//     const response = await fetch(`http://localhost:7000/api/v1/signup`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error("Failed to create user");
//     }

//     console.log(data.data);
//     localStorage.setItem("breadUser", JSON.stringify(data.data));
//     localStorage.setItem("breadToken", data.token);
//     setAuthUser(data);
//   };

//   const {
//     mutateAsync: createUser,
//     isLoading,
//     error,
//     isSuccess,
//   } = useMutation(createMyUserRequest);

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("User created Successfully");
//     }
//   }, [isSuccess]);
//   useEffect(() => {
//     if (error) {
//       toast.error(error.toString());
//     }
//   }, [error]);

//   return {
//     createUser,
//     isLoading,
//     error,
//     isSuccess,
//   };
// };

export const useCreateMyUser = () => {
  const { setAuthUser, setJwt } = useAuthContext();
  const createMyUserRequest = async (user) => {
    const response = await fetch(`http://localhost:7000/api/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    console.log(data.token);
    setJwt(data.token);
    localStorage.setItem("breadUser", JSON.stringify(data.data));
    localStorage.setItem("breadToken", data.token);
    setAuthUser(data);
  };

  const {
    mutateAsync: createUser,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createMyUserRequest);

  useEffect(() => {
    if (isSuccess) {
      toast.success("User created Successfully");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  return {
    createUser,
    isLoading,
    error,
    isSuccess,
  };
};
export const useLoggedMyUser = () => {
  const { setAuthUser, setJwt } = useAuthContext();
  const loginUser = async (user) => {
    const response = await fetch(`http://localhost:7000/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to login");
    }

    setJwt(data.token);
    localStorage.setItem("breadUser", JSON.stringify(data.data));
    localStorage.setItem("breadToken", data.token);
    setAuthUser(data);
  };

  const {
    mutateAsync: login,
    isLoading,
    error,
    isSuccess,
  } = useMutation(loginUser);

  useEffect(() => {
    if (isSuccess) {
      toast.success("User login Successfully");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  return {
    login,
    isLoading,
    error,
    isSuccess,
  };
};

export const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const logoutUser = async () => {
    const response = await fetch("http://localhost:7000/api/v1/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to logout");
    }

    localStorage.removeItem("breadUser");
    localStorage.removeItem("breadToken");
    setAuthUser(null);
  };

  const {
    mutateAsync: logout,
    isLoading,
    error,
    isSuccess,
  } = useMutation(logoutUser);

  useEffect(() => {
    if (isSuccess) {
      toast.success("User logout Successfully");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  return {
    logout,
    isLoading,
    error,
    isSuccess,
  };
};

export const useGetAllUsers = () => {
  const getAllUsers = async (id) => {
    const response = await fetch(`http://localhost:7000/api/v1/getAllUser`);
    if (!response.ok) {
      throw new Error("Error in Getting All Users");
    }

    return await response.json();
  };

  const {
    mutateAsync: getAllUser,
    isLoading,
    isSuccess,
    error,
  } = useMutation(getAllUsers);

  return { getAllUser, isLoading, isSuccess, error };
};
