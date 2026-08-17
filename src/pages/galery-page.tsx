import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useState } from "react";
import Footer from "../components/footer";
import GaleryItem from "../components/galery-item";
import Header from "../components/header";
import { useGallery } from "../features/gallery/hooks/use-fetch-gallery";

const GaleryPage = () => {
  const { galleries, error, loading } = useGallery();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;


  //  const sortedItems = useMemo(() => {
  //       return [...galleries].sort((a, b) => {
  //         return (
  //           new Date(b.).getTime() - new Date(a.date_upload).getTime()
  //         );
  //       });
  //     }, [reports]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGalleries = galleries.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(galleries.length / itemsPerPage);
  return (
    <div className="bg-zinc-50">
      <Header />
      <div className="bg-white mb-24">
        <div className="w-[70%] mx-auto text-center text-black">
          <div className="mt-10 text-green-700 text-sm font-semibold">
            NOTRE GALLLERIE
          </div>
          <h3 className="text-4xl text-gray-600 my-10 font-bold">
            Les photos de nos <span className="text-green-800">activités</span>
          </h3>
        </div>

        <div className=" w-[70%] mx-auto my-4">
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
          {galleries.length === 0 && (
            <p className="text-green-700 text-sm text-center my-10">
              Aucune photo ...
            </p>
          )}
        </div>
        <div className="w-[70%] mx-auto my-4 grid grid-cols-4 gap-2">
          {currentGalleries.map((event, i) => (
            <GaleryItem galery={event} key={i} />
          ))} 
        </div>

        {galleries.length > 8 && (
          <div className="w-[70%] mx-auto flex gap-2 text-gray-500 px-4 py-2 rounded mt-6">
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

        <div className="w-[70%] mx-auto my-10">
          <p className="text-gray-500 text-lg my-6 py-10">
            L’ACEDH-RDC applique une approche juridico-socio-anthropologique
            pour la sauvegarde sociale, économique, environnementale pro pauvres
            et pro nature au service de l’humanité.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GaleryPage;
