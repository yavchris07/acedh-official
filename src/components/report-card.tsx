import { FileChartColumnIncreasing, Download } from "lucide-react";
import type { Project, Report } from "../utils/type";
import { encryptId } from "../utils/crypting";
import { useNavigate } from "react-router";

type reportCardProps = {
  report: Report;
  project: Project[];
  onOpen: () => void;
};

const ReportCard = ({ report, project, onOpen }: reportCardProps) => {
  const navigate = useNavigate();
  const handleDownload = async () => {
    try {
      const res = await fetch(report.fichier_pdf);

      if (!res.ok) throw new Error("Erreur téléchargement");

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = report.commentaire || "rapport.pdf";

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const projectName =
    project.find((proj) => String(proj.id) === String(report.projet))?.titre ||
    "Inconnue";
  return (
    <div
      key={report.id}
      className="rounded flex flex-col text-start hover:bg-gray-300 py-4 px-2"
    >
      <span className="text-green-800 flex items-center my-2">
        {" "}
        <FileChartColumnIncreasing size={17} /> acedh-rdc
      </span>{" "}
      <div>
        <img
          src={report.page_garde}
          alt="Page de garde"
          width={200}
          height={180}
          className="w-full h-36 object-cover rounded"
        />
      </div>
      <h3 className="font-bold text-lg">{projectName}</h3>
      <span className="text-gray-400 text-sm italic">
        {report.commentaire.length < 220
          ? report.commentaire
          : report.commentaire.substring(0, 190)}{" "}
        {report.commentaire.length < 190 ? report.commentaire : "..."}
      </span>
      <div className="flex justify-between">
        <span
          className="flex items-center w-40 gap-2 bg-green-800 text-white rounded my-2 px-2 py-2 cursor-pointer max-sm:text-sm max-sm:w-30"
          onClick={report.type_document === "rapport" ? onOpen : handleDownload}
        >
          <Download color="white" size={20} />{" "}
          {report.type_document === "rapport" ? "Autorisation" : "Télécharger"}
        </span>
        <span
          onClick={() => {
            const id = encryptId(report.id);
            navigate(`/rapport/${id}`);
          }}
          className="flex items-center w-20 gap-2 bg-green-800 text-white rounded my-2 px-2 py-2 cursor-pointer max-sm:text-sm max-sm:w-18"
        >
          Lire plus
        </span>
      </div>
    </div>
  );
};

export default ReportCard;
