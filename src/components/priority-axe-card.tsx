type Axe = {
  id: number;
  name: string;
};
type priorityAxeCardProps = { axe: Axe };

const PriorityAxeCard = ({ axe }: priorityAxeCardProps) => {
  return (
    <div className="flex gap-2 my-3">
      <div className="bg-amber-600 rounded-full w-4 h-4 mt-2 border-2 border-green-700"></div>
      <p className="text-green-800">{axe.name}</p>
    </div>
  );
};

export default PriorityAxeCard;
