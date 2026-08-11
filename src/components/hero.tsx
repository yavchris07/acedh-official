import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative py-0 overflow-hidden bg-zinc-100">
      {/* bg-[#f4f6f9] */}
      {/* GRID INCLINÉE */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div
          className="w-300 h-180 opacity-40"
          style={{
            transform: "rotate(-8deg)",
            backgroundImage: `
              linear-gradient(#cbd5e1 1px, transparent 1px),
              linear-gradient(90deg, #cbd5e1 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* CONTENU */}
      <div className="relative z-10 max-w-4xl mx-auto text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* ALERT BOX */}
          <div className="bg-white shadow-md px-6 py-3 inline-flex items-center gap-4 rounded mb-10">
            <span className="text-green-600 font-semibold text-sm max-sm:text-xs">
              ACEDH-RDC
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-5xl md:text-6xl font-bold text-green-700 max-sm:text-3xl">
            Environnement <span className="text-orange-900">·</span>{" "}
            <span className="text-green-500">Droits de l&apos;homme</span>{" "}
            {/* <span className="text-orange-400">·</span>{" "}
          <span className="text-blue-300">Diversité</span> */}
          </h1>

          {/* SUBTITLE */}
          <p className="mt-6 text-gray-600 text-lg">
            Nous visons un monde plus juste où les êtres et leur environnement
            sont au centre de la gouvernance et de la prise de décision
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex justify-center gap-4 max-sm:flex-col max-sm:items-center">
            <Link
              to={"/rapports"}
              className="bg-green-700 text-white px-6 py-3 rounded-md cursor-pointer"
            >
              NOS RAPPORTS →
            </Link>

            <Link
              to={"/programs"}
              className="bg-gray-200 text-green-700 px-6 py-3 rounded-md cursor-pointer"
            >
              NOTRE PROGRAMMES →
            </Link>
          </div>

          {/* SLIDER ARROWS */}
          <div className="mt-6 flex justify-center gap-3 text-white">
            <button className="border px-2 py-1 bg-green-700 cursor-pointer flex items-center justify-center">
              ←
            </button>
            <button className="border px-2 py-1 bg-green-700 cursor-pointer flex items-center justify-center">
              →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
