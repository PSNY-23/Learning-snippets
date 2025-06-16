import { account } from "@/appwrite/appwrite";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");
        const user = await account.get();
        setUser(user);
      } catch (error: any) {
        setError(error.message || "Not logged in");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return { loading, user, error };
};
