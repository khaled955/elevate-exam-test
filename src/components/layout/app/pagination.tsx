// &==> Types
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
};
// ==============================================================================================================
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 8,
}: PaginationProps) {
  // =========================================================================================================
  // !!==> Guard Clause
  if (totalPages <= 1) return null;

  // =========================================================================================================
  // &==> Variables
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  // **===> Handling Next & Prev Click Btn (Desktop Pages Range)
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // ==========================================================================================================

  /*//^ ================================
                                   Paginated Jsx
                                ================================ //*/

  return (
    <div className="mt-6 flex justify-center">
      {/* //?==> Mobile Version (Only Prev | Current | Next) */}
      <div className="flex items-center gap-2 sm:hidden">
        {/*//*==> Prev Button (Mobile) */}
        <button
          className={`px-3 py-1.5 rounded-md border text-sm transition
            ${
              currentPage === 1
                ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white border-gray-400 text-gray-700 hover:bg-gray-100"
            }
          `}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        {/* //!!==> Current Page Indicator (Mobile) */}
        <span className=" flex gap-2 min-w-[48px] text-center text-sm font-semibold rounded-md bg-blue-600 text-white px-3 py-1.5 shadow-md">
          <span>{currentPage}</span> / <span>{totalPages}</span>
        </span>

        {/*//*==> Next Button (Mobile) */}
        <button
          className={`px-3 py-1.5 rounded-md border text-sm transition
            ${
              currentPage === totalPages
                ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white border-gray-400 text-gray-700 hover:bg-gray-100"
            }
          `}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* //?==> Desktop / Tablet Version (Full Pagination Buttons) */}
      <div className="hidden sm:flex items-center gap-1">
        {/*//*==> Prev Button (Desktop) */}
        <button
          className={`px-4 py-2 rounded-md border transition 
            ${
              currentPage === 1
                ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white border-gray-400 text-gray-700 hover:bg-gray-100"
            }
          `}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        {/* //??==> Page Numbers (Desktop) */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            className={`min-w-[40px] px-3 py-2 rounded-md text-sm font-medium transition 
              ${
                page === currentPage
                  ? "bg-blue-600 text-white shadow-md cursor-default"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        ))}

        {/*//!!==> Next Button (Desktop) */}
        <button
          className={`px-4 py-2 rounded-md border transition 
            ${
              currentPage === totalPages
                ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white border-gray-400 text-gray-700 hover:bg-gray-100"
            }
          `}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
