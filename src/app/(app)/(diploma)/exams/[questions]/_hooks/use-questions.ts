import { useQuery } from "@tanstack/react-query";
import { fetchQuestionsService } from "../_services/fetch-questions.service";
// ============================================================================================================
const ERROR_MSG = `Error During Fetch Exams`
// ============================================================================================================

export function useQuestions(examId: string) {
  const {
    data: payload,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions", examId],
    queryFn:async ()=>{
    const payload = await fetchQuestionsService(examId)

    if("code" in payload){
      throw new Error (payload?.message || ERROR_MSG)
    }


    return payload
    },
    staleTime: 6 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { payload, isLoading, error };
}
