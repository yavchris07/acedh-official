import type { Activity } from "../utils/type";
import ArticleCard from "./article-card";
import { useMemo } from "react";

type articleListProps = {
  articles: Activity[];
};

const ArticleList = ({ articles }: articleListProps) => {
  const sortedItems = useMemo(() => {
    // [...items] crée une copie superficielle pour ne pas muter le prop ou l'état d'origine
    return [...articles].sort((a, b) => {
      return (
        new Date(b.date_upload).getTime() - new Date(a.date_upload).getTime()
      );
    });
  }, [articles]);

  return (
    <div className="mx-auto my-4 grid grid-cols-2 gap-2  max-sm:grid-cols-1 max-sm:gap-6">
      {sortedItems.slice(0, 2).map((article, i) => (
        <ArticleCard key={i} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
