import { useParams } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";
import { decryptId } from "../utils/crypting";
import { formatResume } from "../utils/format-resume";
import { useGetReport } from "../features/rapport/hooks/use-get-report";

const SingleReport = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    console.log(id);
    console.log("Rapport non trouve !!");
  }

  const idx = decryptId(id ?? "");
  // const { activity, loading } = useGetActivity(Number(idx));
  //   const { comments, error, loading: load, refresh } = useComments(Number(idx));
  const {error,loading,report} = useGetReport(Number(idx));
  console.log('RRRR : ',report)

  if(error) return <p>Une erreur s'est produite ! Veuillez reactualiser la page !</p>

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

        <h2 className="text-gray-900 text-2xl font-semibold my-4">
          {report?.commentaire.substring(0,120)}
        </h2>
        <div className="text-gray-500 text-xl max-sm:text-sm">
          {formatResume(report?.commentaire ?? "")}
        </div>

        {/* <p className="text-2xl text-green-600 text-center italic">
          En cours de développement
        </p> */}
      </div>
      <Footer />
    </div>
  );
};

export default SingleReport;
