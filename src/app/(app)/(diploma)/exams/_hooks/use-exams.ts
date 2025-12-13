import { useQuery } from "@tanstack/react-query";
import {  fetchExamsService } from "../_services/fetch-exams.service";

export function useExams() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["exams"],
    queryFn:async ()=> {
      const payload =  await fetchExamsService()
      if("code" in payload){
        throw new Error(payload?.message || "Error During Fetch Exams")
      }

      return payload
    
    },
    staleTime: 6 * 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}
