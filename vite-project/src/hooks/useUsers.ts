import { useEffect, useState } from "react";
import type { User } from "../services/user-service";
import userService from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          return;
        } else {
          setError(error.message);
          setLoading(false);
        }
      });

    return () => cancel();
  }, []);
  return { users, error, isLoading, setError, setUsers };
};

export default useUsers;
