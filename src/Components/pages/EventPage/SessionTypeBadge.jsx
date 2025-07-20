import { RiGroupLine } from "react-icons/ri";
import { GrWorkshop } from "react-icons/gr";
import { GoPerson } from "react-icons/go";
import { GrGroup } from "react-icons/gr";

const SessionTypeBadge = ({ sessionType }) => {
  let icon = null;
  let label = "";
  let bgColor = "";
  let color = "";

  switch (sessionType.toLowerCase()) {
    case "1-1":
      icon = <GoPerson className="text-blue-500 font-extrabold text-xl" />;
      label = "1-1";
      bgColor = "bg-blue-100";
      color = "text-blue-800";
      break;

    case "group":
      icon = <RiGroupLine className="text-green-500 font-extrabold text-xl" />;
      label = "Group";
      bgColor = "bg-green-100";
      color = "text-green-800";
      break;

    case "workshop":
      icon = <GrWorkshop className="text-yellow-500 font-extrabold text-xl" />;
      label = "Workshop";
      bgColor = "bg-yellow-100";
      color: "text-yellow-800";
      break;
   case "1-n":
      icon = <GrGroup className="text-yellow-500 font-extrabold text-xl" />;
      label = "1:N";
      bgColor = "bg-yellow-100";
      color: "text-yellow-800";
      break;
    default:
      icon = null;
      label = "Unknown Type";
      bgColor = "bg-gray-100";
      color = "text-gray-800";
      break;
  }

  return (
    <div className="flex justify-between items-center flex-wrap gap-2 w-full">
      <span
        className={`inline-flex items-center px-3 py-1 mb-2
          rounded-full text-xs font-medium ${bgColor} ${color}`}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </span>
    </div>
  );
};

export default SessionTypeBadge;
