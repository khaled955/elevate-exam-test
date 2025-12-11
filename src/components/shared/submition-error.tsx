import { CircleX } from 'lucide-react';

export default function SubmitionError({Msg}:{Msg:string | undefined | string[]}) {
  return (
    <div className="relative border border-red-500 py-2 text-center bg-red-50 ">
      <p className="text-red-600  text-lg capitalize px-2">{Msg}</p>
      <div className="icon absolute -top-3 left-[50%] -translate-x-[50%] text-red-500">
        <CircleX/>
      </div>
    </div>
  )
}
