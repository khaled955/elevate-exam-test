import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "../_services/fetch-questions";

export function useQuestions(examId: string) {
  const {
    data: payload,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions", examId],
    queryFn: () => fetchQuestions(examId),
    staleTime: 6 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { payload, isLoading, error };
}
