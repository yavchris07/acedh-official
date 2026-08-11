import type { Team } from "../utils/type";

type teamItemProps = {
  item: Team;
};

const TeamItem = ({ item }: teamItemProps) => {
  const imageUrl =
    item.image instanceof File ? URL.createObjectURL(item.image) : item.image;

  return (
    <div className="w-48 h-56">
      {imageUrl && (
        <img
          src={imageUrl}
          width={100}
          height={120}
          alt="team-photo"
          className="w-[90%] mx-auto h-44 object-cover rounded-full"
          // unoptimized
        />
      )}
      <h3 className="mt-4 text-black text-xl">{item.noms}</h3>
      <span className="text-gray-500 text-sm">{item.fonction}</span>
    </div>
  );
};

export default TeamItem;
