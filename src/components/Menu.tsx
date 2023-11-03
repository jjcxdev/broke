import MenuItem from "./MenuItem";
import { BsCashCoin } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import CreateBillButton from "./CreateBillButton";

export default function Menu() {
  return (
    <aside className="flex h-full flex-col justify-between">
      <div className="flex flex-row items-center gap-1 pb-6">
        <div>
          <Image src="/logo.png" height={30} width={30} alt="broke logo" />
        </div>
        <div className="text-2xl">broke</div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <CreateBillButton />
          <MenuItem icon={<FaUsers />} label="Household" />
          <MenuItem icon={<BsCashCoin />} label="Income" />
          <MenuItem icon={<BsBank2 />} label="Bills" />
        </div>
        <div className="flex flex-col gap-4 pb-4">
          <MenuItem icon={<FaBell />} label="Reminders" />
          <MenuItem icon={<FaGear />} label="Settings" />
          <MenuItem icon={<CgProfile />} label="Profile" />
        </div>
      </div>
    </aside>
  );
}
