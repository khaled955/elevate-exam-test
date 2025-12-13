import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDiplomasService } from "../_services/fetch-diplomas.service";

export function useDiplomas(){

     const { data,  fetchNextPage, hasNextPage, isFetchingNextPage,isLoading} =
    useInfiniteQuery({
      queryKey: ["diplomas"],
      queryFn:({ pageParam })=>{

          return fetchDiplomasService(pageParam,3)
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
      const { currentPage, numberOfPages } = lastPage.metadata;
 if (currentPage < numberOfPages) {
        return currentPage + 1;
      }

      return undefined;
        
      },
       refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 6 * 1000 * 60,
    });


return { data,  fetchNextPage, hasNextPage, isFetchingNextPage,isLoading}


}