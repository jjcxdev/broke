import MenuItem from "./MenuItem";
import { BsCashCoin } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import BrokeLogo from "/BrokeLogo.svg";

export default function Menu() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <BrokeLogo />
      </div>
      <div className="pb-6 pt-4">broke</div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <MenuItem icon={<FaUsers />} label="Household" />
          <MenuItem icon={<BsCashCoin />} label="Income" />
          <MenuItem icon={<BsBank2 />} label="Bills" />
        </div>
        <div className="flex flex-col gap-4">
          <MenuItem icon={<FaBell />} label="Reminders" />
          <MenuItem icon={<FaGear />} label="Settings" />
          <MenuItem icon={<CgProfile />} label="Profile" />
        </div>
      </div>
    </div>
  );
}
