import { Button } from "@/components/ui/button";
import { Loader, TriangleAlert, X } from "lucide-react";
import { useDeleteProfile } from "../_hooks/use-delete-profile";
import SubmitionError from "@/components/shared/submition-error";

// ================================================================================================================
// &&==> Types
type DeleteAlertProps = {
  onClose: () => void;
};
// ================================================================================================================
export default function DeleteAlert({ onClose }: DeleteAlertProps) {
  // ============================================================================================================
  //*===>Hooks ================> Mutate(Delete)
  const { mutate: onDelete, isPending, error } = useDeleteProfile();

  // ============================================================================================================
  // ??==> Handlers
  const handleDeleteProfile =  () => {
     onDelete();
  };

  // ================================================================================================================

  return (
    <div className="fixed inset-0 z-[51] bg-slate-600/25 flex justify-center items-center">
      <div className="section bg-white pt-6 flex flex-col gap-6 relative">
        {/* //^^==> Close Btn */}
        <div className="close-btn absolute top-2 end-2">
          <button disabled={isPending} onClick={onClose}>
            <X className=" text-gray-500" />
          </button>
        </div>
        {/*//^>>Alert Icon */}
        <div className="alert-icon relative bg-red-100 w-fit mx-auto p-3 rounded-full after:content-[''] after:bg-red-50/30 after:absolute after:left-[50%] after:-translate-x-[50%] after:top-[50%] after:-translate-y-[50%] after:w-[150%] after:h-[150%] after:rounded-full after:-z-10 isolate">
          <TriangleAlert size={40} className="text-red-600" />
        </div>
        {/* //^==>Alert Text */}
        <div className="alert-text px-6 font-geist py-7">
          <p className="text-red-600 text-lg font-geist">
            Are you sure you want to delete your account?
          </p>
          <span className=" text-gray-500 text-sm mb-3">
            This action is permanent and cannot be undone.
          </span>

          {/*//!==> Error Msg After Submition */}
          {error && <SubmitionError Msg={error?.message} />}
        </div>
        {/* //^^==> Alert Btns */}
        <div className="action-btn flex gap-4 px-6  bg-gray-50 border-t-[1px] border-t-gray-200 py-5">
          {/* //^^==> Close Btn */}
          <Button
            disabled={isPending}
            onClick={onClose}
            className="grow"
            variant="secondary"
          >
            Cancel
          </Button>
          {/* //!!==> Delete Btn */}
          <Button
            disabled={isPending}
            onClick={handleDeleteProfile}
            className="grow"
            variant="destructive"
          >
            {isPending ? <Loader className="animate-spin" /> : "Yes, delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
