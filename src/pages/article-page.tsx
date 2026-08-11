import { useParams } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";
import { useGetActivity } from "../features/activity/hooks/use-get-activity";
import CommentList from "../features/comments/component/comment-list";
import CreateComment from "../features/comments/component/create-comment";
import { useComments } from "../features/comments/hooks/use-comments";
import { decryptId } from "../utils/crypting";
import { formatResume } from "../utils/format-resume";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    console.log(id);
    console.log("Article non trouve !!");
  }

  const idx = decryptId(id ?? "");
  const { activity, loading } = useGetActivity(Number(idx));
  const { comments, error, loading: load, refresh } = useComments(Number(idx));

  return (
    <div className="bg-zinc-50">
      <Header />
      <div className="w-[70%] mx-auto max-sm:w-[97%]">
        <div className="my-4 bg-r flex gap-4">
          <div className="w-full">
            {activity?.photo && (
              <img
                src={activity?.photo}
                width={200}
                height={530}
                alt="image blog"
                className="object-contain h-auto w-full"
                loading="lazy"
              />
            )}
            {loading && (
              <p className="text-center text-green-700 text-sm">Loading...</p>
            )}
          </div>
        </div>

        <h2 className="text-gray-900 text-2xl font-semibold my-4">
          {activity?.titre}
        </h2>
        <div className="text-gray-500 text-xl max-sm:text-sm">
          {formatResume(activity?.resume ?? "")}
        </div>

        <CreateComment onRefresh={refresh} open project={Number(id)} />
        <CommentList comments={comments} loading={load} error={error} />
      </div>
      <Footer />
    </div>
  );
};

export default ArticlePage;
