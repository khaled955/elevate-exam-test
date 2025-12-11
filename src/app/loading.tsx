import { Loader } from "lucide-react";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen fixed inset-0 bg-gray-600/20 z-[52]">
      <Loader className="animate-spin" />
    </div>
  );
}
