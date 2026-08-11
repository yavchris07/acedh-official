// import { Project } from "@/features/project/api";
// import { Report } from "@/features/rapport/api";
// import { FileChartColumnIncreasing, Download } from "lucide-react";

// export type Reports = {
//   fichier_pdf: string;
//   commentaire: string;
//   type_document: string;
//   projet: string;
//   id: number;
// };

// type reportCardProps = {
//   report: Reports;
// };

// const SimpleDoc = ({ report }: reportCardProps) => {
//   const handleDownload = async () => {
//     try {
//       const res = await fetch(report.fichier_pdf);

//       if (!res.ok) throw new Error("Erreur téléchargement");

//       const blob = await res.blob();

//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = report.commentaire || "rapport.pdf";

//       document.body.appendChild(a);
//       a.click();
//       a.remove();

//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Erreur:", error);
//     }
//   };
//   return (
//     <div
//       key={report.id}
//       className="rounded flex flex-col text-start hover:bg-gray-300 py-4 px-2"
//     >
//       <span className="text-green-800 flex items-center my-2">
//         {" "}
//         <FileChartColumnIncreasing size={17} /> acedh-rdc
//       </span>{" "}
//       <h3>{report.projet}</h3>
//       <span className="text-gray-400 text-sm italic">
//         {report.commentaire.length < 220
//           ? report.commentaire
//           : report.commentaire.substring(0, 190)}{" "}
//         {report.commentaire.length < 190 ? report.commentaire : "..."}
//       </span>
//       <span
//         className="flex items-center w-40 gap-2 bg-green-800 text-white rounded my-2 px-2 py-2 cursor-pointer"
//         onClick={handleDownload}
//       >
//         <Download color="white" size={20} /> Télécharger
//       </span>
//     </div>
//   );
// };

// export default SimpleDoc;


import { Download, FileChartColumnIncreasing } from "lucide-react"; // Ajustez l'import selon votre projet
// import type { Report } from "../utils/type";
interface Report {
  id: number;
  projet: string;
  type_document: string;
  fichier_pdf: string;
  commentaire: string;
}

interface reportCardProps {
  report: Report;
}

const SimpleDoc = ({ report }: reportCardProps) => {
  const handleDownload = async () => {
    try {
      // Fetch le fichier localisé dans le dossier public
      const res = await fetch(report.fichier_pdf);

      if (!res.ok) throw new Error("Erreur lors du téléchargement du fichier");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      
      // Donne un nom propre au fichier téléchargé (ex: "PROJET CARTOGRAPHIE.pdf")
      a.download = `${report.projet.toLowerCase().replace(/\s+/g, "_")}.pdf`;

      document.body.appendChild(a);
      a.click();
      
      // Nettoyage de la mémoire
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur de téléchargement :", error);
      alert("Impossible de télécharger le fichier. Vérifiez qu'il est bien placé dans le dossier public/.");
    }
  };

  // Gestion propre du texte trop long
  const MAX_LENGTH = 190;
  const formattedCommentaire =
    report.commentaire.length > MAX_LENGTH
      ? `${report.commentaire.substring(0, MAX_LENGTH)}...`
      : report.commentaire;

  return (
    <div className="rounded flex flex-col text-start hover:bg-gray-300 py-4 px-2">
      <span className="text-green-800 flex items-center gap-1 my-2">
        <FileChartColumnIncreasing size={17} /> acedh-rdc
      </span>
      
      <h3 className="font-bold text-lg">{report.projet}</h3>
      
      <span className="text-gray-400 text-sm italic my-1">
        {formattedCommentaire}
      </span>
      
      <button
        onClick={handleDownload}
        className="flex items-center w-40 gap-2 bg-green-800 hover:bg-green-900 text-white rounded my-2 px-2 py-2 cursor-pointer transition-colors border-none text-left"
      >
        <Download color="white" size={20} /> Télécharger
      </button>
    </div>
  );
};

export default SimpleDoc;
