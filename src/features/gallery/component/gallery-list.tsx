import { Edit2Icon, Trash2Icon } from "lucide-react";
import type { Gallery } from "../../../utils/type";

type galleryListProps = {
  galleries: Gallery[];
  onEdit: (gallery: Gallery) => void;
  onDelete: (gallery: Gallery) => void;
};

const GalleryList = ({ galleries, onEdit, onDelete }: galleryListProps) => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Detail
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Image
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {galleries.map((gallery: Gallery, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-500">
                {gallery.detail_activite.substring(0, 90)}
                {gallery.detail_activite.length < 90 ? "" : "..."}
              </td>
              <td className="px-6 py-4">
                {gallery.photo && (
                  <img
                    src={gallery.photo}
                    alt={"galery acedh-rdc"}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
              </td>
              <td className="px-6 py-4 flex items-center gap-4">
                <button
                  onClick={() => onEdit(gallery)}
                  className="cursor-pointer text-blue-500 hover:text-blue-300"
                >
                  <Edit2Icon size={18} />
                </button>
                <button
                  onClick={() => onDelete(gallery)}
                  className="text-red-400 hover:text-red-300 cursor-pointer"
                >
                  <Trash2Icon size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GalleryList;
