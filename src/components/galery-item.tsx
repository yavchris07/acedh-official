import type { Gallery } from "../utils/type";

type galeryItemProps = {
  galery: Gallery;
};

const GaleryItem = ({ galery }: galeryItemProps) => {
  return (
    <div className="relative h-87.5 my-2  mx-1 rounded overflow-hidden group ">
      {/* IMAGE */}
      <img
        src={galery.photo}
        className="w-full h-full object-fill"
        alt=""
        width={200}
        height={200}
        // loading="eager"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />

      {/* CATEGORY */}
      <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-2 py-1">
        ● ACEDH-RDC
      </div>

      {/* TITLE */}
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-semibold">
          {galery.detail_activite.substring(0, 60)}{" "}
          {galery.detail_activite.length > 60 ? "..." : ""}
        </h3>
      </div>
    </div>
  );
};

export default GaleryItem;
