import { items } from "../utils/items";
import { useNavigate } from "react-router";

type sidebarProps = {
  path: string;
  // setActive: (name: string) => void;
};

export function Sidebar({path}:sidebarProps) {
  const navigate = useNavigate();
  const active = path;


  return (
    <div className="w-64 h-screen bg-green-800 shadow-lg p-4">
      <div className="bg-white py-2 px-4 rounded mb-6">
        <h1 className="text-xl text-gray-500 font-bold py-3 text-center">
          {" "}
          ACEDH RDC
        </h1>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 py-1 px-2 rounded-xl cursor-pointer transition ${
              active === item.path
                ? "bg-gray-100 text-gray-700"
                : "hover:bg-gray-100 hover:text-gray-700 text-gray-300"
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
