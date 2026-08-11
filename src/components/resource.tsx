import res from "../assets/res.jpg";
import type { Resource } from "../utils/type";

type resourceProps = {
  resource: Resource;
};

const ResourceCard = ({ resource }: resourceProps) => {
  const handleDownload = async () => {
    try {
      const res = await fetch(resource.fichier_pdf);

      if (!res.ok) throw new Error("Erreur téléchargement");

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = resource.titre || "rapport.pdf";

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  return (
    <div className="text-start my-4 mx-2 py-2">
      <img
        src={res}
        width={340}
        height={220}
        alt="image"
        className="object-cover"
        // priority
      />{" "}
      <h4 className="text-2xl font-bold text-black my-3">{resource.titre}</h4>
      <span
        className="py-2 px-4 bg-orange-900 text-white text-sm rounded my-4 cursor-pointer"
        onClick={handleDownload}
      >
        Télécharger le document
      </span>
    </div>
  );
};

export default ResourceCard;
