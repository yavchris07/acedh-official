import { useMemo } from "react";
import ArticleCard from "../components/article-card";
import Footer from "../components/footer";
import Header from "../components/header";
import { useFetchActivities } from "../features/activity/hooks/use-fetch-activities";

const BlogPage = () => {
  const { activities, error, loading } = useFetchActivities();
  const sortedItems = useMemo(() => {
    return [...activities].sort((a, b) => {
      return (
        new Date(b.date_upload).getTime() - new Date(a.date_upload).getTime()
      );
    });
  }, [activities]);
  return (
    <div className="bg-zinc-50">
      <Header />
      <div className="bg-white">
        <div className="w-[70%] mx-auto text-center text-black max-sm:w-[97%]">
          <div className="mt-10 text-green-700 text-sm font-semibold">
            NOS ARTICLES
          </div>
          <h3 className="text-4xl text-gray-600 my-10 font-bold max-sm:text-xl">
            Nous plubions chacune de nos{" "}
            <span className="text-green-800">activités</span> pour rester
            transparent
          </h3>
        </div>

        <div className="w-[70%] mx-auto my-4">
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
        </div>
        <div className="w-[70%] mx-auto my-4 grid grid-cols-3 gap-2 max-sm:w-[97%] max-sm:grid-cols-1">
          {sortedItems.map((article, i) => (
            <ArticleCard article={article} key={i} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
