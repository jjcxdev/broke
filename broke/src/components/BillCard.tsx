import { LuRepeat2 } from "react-icons/lu";
import { BsShieldFillCheck } from "react-icons/bs";

export default function BillCard() {
  return (
    <div className="h-fit w-full rounded-lg bg-neutral-500">
      <div className="px-4 py-2">
        <div className="flex flex-row items-center justify-between gap-8">
          <h2 className="text-3xl text-white">$11.25</h2>
          <div className="flex flex-row items-center justify-between gap-1">
            <div className="h-fit w-fit rounded-md bg-white px-1 py-[2px] text-xs text-black">
              30/36
            </div>
            <div>
              <LuRepeat2 className="text-lg text-white" />
            </div>
            <div>
              <BsShieldFillCheck className="text-lg text-white" />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-fit text-xs text-white">Paramount+</div>
        </div>
      </div>
    </div>
  );
}
