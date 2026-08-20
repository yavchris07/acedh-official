import { useEffect } from "react";
import Footer from "../components/footer";
import ResourceCard from "../components/resource";
import Header from "../components/header";
import { useResources } from "../features/resource/hooks/use-resource";

const ResourcePage = () => {
  const { resources, loading, refresh, error } = useResources();
  useEffect(() => {
    refresh();
  }, []);
  
  return (
    <div className="bg-zinc-50">
      <Header />
      <div className="bg-white">
        <div className="w-[70%] mx-auto text-center text-black max-sm:w-[97%]">
          <div className="mt-10 text-green-700 text-sm font-semibold">
            NOS RESSOURCES
          </div>
          <h3 className="text-4xl text-gray-600 my-10 font-bold max-sm:text-xl">
            Quelques <span className="text-green-800">Ressources</span> &
            Documentations
          </h3>

          <div>
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
            {resources.length === 0 && (
              <p className="text-green-500 text-sm text-center my-36">
                Aucune resource !
              </p>
            )}
          </div>
          <div className="grid grid-cols-3 m-3 max-sm:grid-cols-1">
            {resources.map((r, i) => (
              <ResourceCard resource={r} key={i} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResourcePage;
