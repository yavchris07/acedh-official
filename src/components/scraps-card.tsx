import type { Scrap } from "../utils/type";

type scrapsCardProps = { scraps: Scrap };

const ScrapsCard = ({ scraps }: scrapsCardProps) => {
  return (
    <div className="w-3xs px-2 bg-gray-100 rounded my-4 py-3 hover:bg-gray-200">
      <h1 className="text-xl text-black font-medium mb-2">{scraps.title}</h1>
      <a href={scraps.url} className="bg-green-700 px-4 py-2 rounded text-white">
        {" "}
        Lire plus
      </a>
    </div>
  );
};

export default ScrapsCard;
