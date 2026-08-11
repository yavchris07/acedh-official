import { User } from "lucide-react";
import type { Comment } from "../../../utils/type";

type commentListProps = {
  comments: Comment[];
  error: string;
  loading: boolean;
};

const CommentList = ({ comments, loading, error }: commentListProps) => {
  console.log(comments);
  return (
    <div className="my-4 rounded-lg">
      {loading && (
        <p className="text-sm text-green-700">Chargement de commentaires ...</p>
      )}
      {error && (
        <p className="text-xs text-red-500">
          Erreur lors de chargement de commentaires !
        </p>
      )}
      {comments.map((comm, i) => (
        <div
          className="rounded-lg mb-6 border-b border-gray-300 pb-1.5"
          key={i}
        >
          <div className="flex items-center gap-1">
            <User className="text-gray-500" size={15} />
            <h3 className="text-sm font-medium text-gray-700">{comm.nom}</h3>
          </div>
          <div className="rounded-lg text-gray-500 italic text-sm">
            {comm.contenu}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
