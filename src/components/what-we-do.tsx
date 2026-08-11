import { useAccompagnment } from "../features/accompaniment/hooks/use-accompagnement";
import { useEnvironment } from "../features/environment/hooks/use-environments";

const WhatWeDo = () => {
  const { environments, loading } = useEnvironment();
  const { accompagnement, loading: load } = useAccompagnment();

  // Afficher seulement le premier élément
  const firstAccompagnement = accompagnement?.[0];
  const firstEnvironment = environments?.[0];

  // conssole.log("xxxxxxxxx", environments);
  // console.log("zzzzzzzzzzzz", accompagnement);

  // const handleDownloadAcc = async () => {
  //   try {
  //     const res = await fetch(firstAccompagnement?.fichier_pdf);

  //     if (!res.ok) throw new Error("Erreur téléchargement");

  //     const blob = await res.blob();

  //     const url = window.URL.createObjectURL(blob);

  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = firstAccompagnement.titre || "accompagnement.pdf";

  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();

  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Erreur:", error);
  //   }
  // };
  // const handleDownloadEnv = async () => {
  //   try {
  //     const res = await fetch(firstEnvironment?.fichier_pdf);

  //     if (!res.ok) throw new Error("Erreur téléchargement");

  //     const blob = await res.blob();

  //     const url = window.URL.createObjectURL(blob);

  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = firstEnvironment.titre || "rapport.pdf";

  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();

  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Erreur:", error);
  //   }
  // };
  return (
    <div className="py-20">
      <div className="w-[70%] mx-auto max-sm:w-[97%]">
        <div className="flex items-center gap-2">
          <div className="w-1 h-10 bg-orange-900"></div>
          <h3 className="text-4xl font-bold text-gray-800 max-sm:text-2xl">
            Que faisons-nous ?
          </h3>
        </div>
        <div className="grid grid-cols-2 my-10 gap-12 max-sm:grid-cols-1">
          <div className=" text-gray-800 max-sm:mb-4">
            {/* <div className="w-full h-80 bg-green-800"></div> */}
            {/* <Image
              src={firstAccompagnement?.photo}
              width={340}
              height={220}
              alt="image"
              className="object-cover h-80 w-full"
              priority
            /> */}
            {firstAccompagnement?.photo && (
              <img
                src={firstAccompagnement?.photo}
                width={340}
                height={220}
                alt=""
                className="object-cover h-80 w-full"
                // loader={({ src, width, quality }) => {
                //   const controller = new AbortController();
                //   const timeoutId = setTimeout(() => controller.abort(), 10000);
                //   return src; // ou utiliser un proxy
                // }}
                // // Fallback en cas d'erreur
                // onError={(e) => {
                //   console.error("Image failed to load:", e);
                //   // Afficher une image par défaut
                // }}
                loading="lazy"
              />
            )}
            <h3 className="text-2xl font-bold my-10 max-sm:text-xl">
              {/* {loading ? '' :firstAccompagnement?.titre} */}
              {load
                ? "Chargement..."
                : firstAccompagnement?.titre ||
                  "Accompagnement juridique & plaidoyer"}
            </h3>
            <p className="mb-6 text-lg max-sm:text-base">
              {loading && firstAccompagnement?.resume
                ? ""
                : firstAccompagnement?.resume ||
                  "Ce programme est dédié à la défense des droits fonciers, de l’environnement, et à la protection juridique des défenseurs des droits humains et environnementaux. ACEDH agit en faveur de celles et ceux qui, souvent au péril de leur liberté ou de leur vie, se battent pour préserver les forêts, les terres, les rivières et les droits des communautés locales. Alors que les pressions liées à l’exploitation minière, forestière et agricole s’intensifient en RDC, de nombreuses communautés et activistes sont victimes d’intimidations, d’arrestations arbitraires, d’expulsions illégales ou de violences. Le programme vise à leur offrir un accompagnement juridique solide, et à porter leur voix dans les espaces de décision nationaux et internationaux."}
            </p>
            {/* <span
              className="bg-green-700 text-white py-3 px-6 mt-6 rounded cursor-pointer max-sm:text-sm"
              onClick={handleDownloadAcc}
            >
              Télécharger le document
            </span> */}
          </div>
          <div className="text-gray-800">
            {/* <div className="w-full h-80 bg-green-800"></div> */}
            {/* <Image
              src={firstEnvironment?.photo}
              width={340}
              height={220}
              alt="image"
              className="object-cover h-80 w-full"
              priority
            /> */}
            {firstEnvironment?.photo && (
              <img
                src={firstEnvironment?.photo}
                width={340}
                height={220}
                alt=""
                className="object-cover h-80 w-full"
                // loader={({ src, width, quality }) => {
                //   const controller = new AbortController();
                //   const timeoutId = setTimeout(() => controller.abort(), 10000);
                //   return src; // ou utiliser un proxy
                // }}
                // // Fallback en cas d'erreur
                // onError={(e) => {
                //   console.error("Image failed to load:", e);
                //   // Afficher une image par défaut
                // }}
                loading="lazy"
              />
            )}
            <h3 className="text-2xl font-bold my-10 max-sm:text-xl">
              {load
                ? ""
                : firstEnvironment?.titre || "Le programme Environnement"}
            </h3>

            <p className="mb-6 text-lg max-sm:text-base">
              {load && firstEnvironment?.resume
                ? ""
                : firstEnvironment?.resume ||
                  "Le programme Environnement et Justice climatique vise à promouvoir une gestion durable des ressources naturelles, à protéger les écosystèmes menacés, et à défendre les droits des communautés affectées par les dérèglements climatiques et les activités extractives en République Démocratique du Congo. ACEDH s’engage à placer la justice environnementale au cœur des politiques publiques, en reconnaissant que la crise climatique est aussi une crise des droits humains. Les populations locales, notamment les peuples autochtones, les femmes et les jeunes, subissent de plein fouet les conséquences de la déforestation, de l’exploitation minière industrielle, et du dérèglement climatique, tout en étant souvent exclues des processus décisionnels."}
            </p>
            {/* <span
              className="bg-green-700 text-white py-3 px-6 rounded mt-6 cursor-pointer max-sm:text-sm"
              onClick={handleDownloadEnv}
            >
              Télécharger le document
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
