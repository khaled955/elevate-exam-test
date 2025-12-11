import { useQuery } from "@tanstack/react-query";
import { fetchExams } from "../_services/fetch-exams";

export function useExams() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["exams"],
    queryFn: fetchExams,
    staleTime: 6 * 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}
