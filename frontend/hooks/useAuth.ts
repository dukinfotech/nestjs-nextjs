"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useAuth() {
  const { status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(status === "authenticated");
  }, [status]);

  return { isAuthenticated };
}
