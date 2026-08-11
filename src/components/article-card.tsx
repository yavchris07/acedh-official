import { useNavigate } from "react-router";
import { encryptId } from "../utils/crypting";
import type { Activity } from "../utils/type";

type artticleProps = {
  article: Activity;
};

const ArticleCard = ({ article }: artticleProps) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg my-4">
      {article.photo && (
        <img
          src={article.photo}
          alt="card-photo"
          width={300}
          height={220}
          className="w-full h-90 contain-size rounded-xl"
          // loader={({ src, width, quality }) => {
          //   const controller = new AbortController();
          //   const timeoutId = setTimeout(() => controller.abort(), 10000);
          //   return src; // ou utiliser un proxy
          //   console.log(timeoutId);
          // }}
          // // Fallback en cas d'erreur
          // onError={(e) => {
          //   console.error("Image failed to load:", e);
          //   // Afficher une image par défaut
          // }}
          // priority
        />
      )}

      {/* //   onClick={() => {
              //     const id = encryptId(school.pk);
              //     navigate(`/school/${id}`);
              //   }}
              // > */}

      {/* <SafeImage src={article.photo} width={300} height={220} /> */}

      <h4 className="text-black mt-2 font-bold text-2xl">
        {article.titre.substring(0, 42)}{" "}
        {article.titre.length <= 42 ? "" : "..."}
      </h4>
      <p className="text-gray-600 mt-2 mb-4">
        {article.resume.substring(0, 170)}...
      </p>
      <span
        // href={`/blog/${article.id}`}
        onClick={() => {
          const id = encryptId(article.id);
          navigate(`/article/${id}`);
        }}
        className="bg-green-700 text-white px-3 py-2 rounded mt-2 cursor-pointer max-sm:text-sm max-sm:py-2 inline-block"
      >
        Lire plus
      </span>
    </div>
  );
};

export default ArticleCard;
