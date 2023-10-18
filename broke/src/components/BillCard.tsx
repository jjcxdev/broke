import { LuRepeat2 } from "react-icons/lu";
import { BsShieldFillCheck } from "react-icons/bs";
import { SavedEvent } from "@/context/Types";
import GlobalContext from "@/context/GlobalContext";

interface BillCardProps {
  event: SavedEvent;
}

const BillCard: React.FC<BillCardProps> = ({ event }) => {
  const { payee, amount, isRecurring, isPreAuthorized } = event;

  return (
    <div className="billCard">
      <span className="payee">{payee}</span>
      <span className="amount">${amount}</span>
      {isRecurring && (
        <span className="icon">
          <LuRepeat2 />
        </span>
      )}
      {isPreAuthorized && (
        <span className="icon">
          <BsShieldFillCheck />
        </span>
      )}
    </div>
  );
};

export default BillCard;
