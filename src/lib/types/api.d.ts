declare type SuccessResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

declare type PaginatedData<T> = {
  [key: string]: T;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
};
