import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  // Temporarily disable auth queries to prevent infinite requests
  // This allows the UI to be tested without authentication setup
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    enabled: false, // Disable until auth is properly configured
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user: null,
    isLoading: false,
    isAuthenticated: false,
  };
}
