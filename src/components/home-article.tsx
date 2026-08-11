import { motion } from "framer-motion";
import ArticleList from "./article-list";
import { useFetchActivities } from "../features/activity/hooks/use-fetch-activities";

const HomeArticle = () => {
  const { activities, error, loading } = useFetchActivities();
  // console.log('TEST : ',activities)
  return (
    <div className="bg-white py-20">
      <motion.div
        className="w-[70%] mx-auto max-sm:w-[97%]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-10 bg-[#803f1f]"></div>
          <h3 className="text-4xl font-bold text-gray-800 max-sm:text-2xl">
            Actualités récentes
          </h3>
        </div>
        {/* {loading && <p></p>} */}
        {loading && (
          <p className="text-green-700 text-sm text-center my-36">
            Chargement ...
          </p>
        )}
        {error && (
          <p className="text-red-700 text-sm text-center my-36">
            Veillez verifier votre connexion internet !
          </p>
        )}
        <ArticleList articles={activities} />
      </motion.div>
    </div>
  );
};

export default HomeArticle;
