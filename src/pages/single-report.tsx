import { useParams } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";
import { decryptId } from "../utils/crypting";
import { formatResume } from "../utils/format-resume";
import { useGetReport } from "../features/rapport/hooks/use-get-report";
import { useEffect } from "react";

const SingleReport = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    console.log(id);
    console.log("Rapport non trouve !!");

  }

//   if (!id) {
//   return <p>Rapport non trouvé.</p>;
// }

  const idx = decryptId(id ?? "");
  // const { activity, loading } = useGetActivity(Number(idx));
  //   const { comments, error, loading: load, refresh } = useComments(Number(idx));
  const { error, loading, report, metaData } = useGetReport(Number(idx));
  console.log("RRRR : ", report);

  console.log("META DATA : ", metaData);
  useEffect(() => {
    if (!metaData) return;
    document.title = metaData.og_title;
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", metaData.og_title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", metaData.og_description);
    document
      .querySelector('meta[property="og:image"]')
      ?.setAttribute("content", metaData.og_image);
  }, [metaData]);

  if (error)
    return <p>Une erreur s'est produite ! Veuillez reactualiser la page !</p>;

  return (
    <div className="bg-zinc-50">
      <Header />
      <div className="w-[70%] mx-auto max-sm:w-[97%]">
        <div className="my-4 bg-r flex gap-4">
          <div className="w-full">
            {report?.page_garde && (
              <img
                src={report?.page_garde}
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

        <h2 className="text-gray-900 text-2xl font-semibold my-4 max-sm:xl">
          {report?.commentaire.substring(0, 120)}
        </h2>
        <div className="text-gray-500 text-xl max-sm:text-sm">
          {formatResume(report?.commentaire ?? "")}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleReport;

