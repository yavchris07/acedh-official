import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useMemo, useState } from "react";
import AskingReport from "../components/asking-report";
import Footer from "../components/footer";
import Header from "../components/header";
import ReportCard from "../components/report-card";
import { useProjects } from "../features/project/hooks/use-projects";
import { useReports } from "../features/rapport/hooks/use-reports";

const ReportPage = () => {
  const { reports, error, loading } = useReports();
  const { projects } = useProjects();
  const [isModal, setIsModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

    const sortedItems = useMemo(() => {
      return [...reports].sort((a, b) => {
        return (
          new Date(b.date_upload).getTime() - new Date(a.date_upload).getTime()
        );
      });
    }, [reports]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRapports = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  return (
    <div className="bg-zinc-50">
      <Header />
      <div className="bg-white">
        <div className="w-[70%] mx-auto text-center text-black">
          <div className="mt-10 text-green-700 text-sm font-semibold">
            NOS RAPPORTS
          </div>
          <h3 className="text-4xl text-gray-600 my-10 font-bold">
            NOUS PUBLIONS NOS <span className="text-green-800">RAPPORTS </span>
          </h3>

          <div className="text-gray-500 text-xl">
            <p className="my-4 ">
              Derrière ces rapports se trouvent des vies touchées, des
              communautés renforcées et des espoirs renouvelés.
            </p>
          </div>

          {/* length == 0 */}
          <div className="text-gray-500 text-xl">
            {error && (
              <p className="text-red-500 text-sm text-center my-36">
                Erreur due a la mauvaise connexion internet !
              </p>
            )}
            {loading && (
              <p className="text-green-500 text-sm text-center my-36">
                Chargement ...
              </p>
            )}
            {reports.length === 0 && (
              <p className="text-green-500 text-sm text-center my-36">
                Aucun raport pour le moment.
              </p>
            )}
          </div>
          {/* <div className="grid grid-cols-3 gap-2 my-4 py-3 mb-24">
            {reps.map((rep) => (
              <SimpleDoc report={rep} key={rep.id} />
            ))}
          </div> */}
          <div className="grid grid-cols-4 gap-2 my-4 py-3 mb-24">
            {currentRapports.map((rep) => (
              <ReportCard
                report={rep}
                key={rep.id}
                project={projects}
                onOpen={() => setIsModal(true)}
              />
            ))}
          </div>
          {reports.length > 12 && (
            <div className="flex gap-2 text-gray-500 w-max px-4 py-2 rounded mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ArrowBigLeft size={12} />
              </button>

              <span>
                Page {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ArrowBigRight size={12} />
              </button>
            </div>
          )}

          {isModal && (
            <AskingReport
              open={isModal}
              onClose={() => {
                setIsModal(false);
              }}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportPage;
