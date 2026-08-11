type Card = {
  title: string;
  value: number;
};

type AdminCardProps = {
  card: Card;
};

const AdminCard = ({ card }: AdminCardProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <p className="text-gray-500 text-sm">{card.title}</p>
      <h2 className="text-2xl text-gray-500 font-semibold">{card.value}</h2>
    </div>
  );
};

export default AdminCard;
