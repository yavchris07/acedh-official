import Footer from "../components/footer";
import Header from "../components/header";
import Statistics from "../components/statistics";
import { useAccompagnment } from "../features/accompaniment/hooks/use-accompagnement";
import { useEnvironment } from "../features/environment/hooks/use-environments";
import { formatResume } from "../utils/format-resume";

const ProgramPage = () => {
  const { environments } = useEnvironment();
  const { accompagnement } = useAccompagnment();

  // Afficher seulement le premier élément
  const firstAccompagnement = accompagnement?.[0];
  const firstEnvironment = environments?.[0];
  return (
    <div className="bg-zinc-50">
      <Header />
      <div className="bg-white my-14">
        <div className="w-[60%] mx-auto text-center text-black max-sm:w-[90%]">
          <div className="mt-10 text-green-700 text-sm font-semibold">
            NOS PROGRAMMES
          </div>
          <h3 className="text-4xl text-gray-600 my-10 font-bold max-sm:text-xl">
            Accompagnement <span className="text-green-800">juridique</span> &
            plaidoyer
          </h3>

          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <div className="text-2xl text-start text-gray-500 max-sm:text-sm">
              {/* Ce programme est dédié à la défense des droits fonciers, de
              l’environnement, et à la protection juridique des défenseurs des
              droits humains et environnementaux. ACEDH agit en faveur de celles
              et ceux qui, souvent au péril de leur liberté ou de leur vie, se
              battent pour préserver les forêts, les terres, les rivières et les
              droits des communautés locales. Alors que les pressions liées à
              l’exploitation minière, forestière et agricole s’intensifient en
              RDC, de nombreuses communautés et activistes sont victimes
              d’intimidations, d’arrestations arbitraires, d’expulsions
              illégales ou de violences. Le programme vise à leur offrir un
              accompagnement juridique solide, et à porter leur voix dans les
              espaces de décision nationaux et internationaux. */}
              {formatResume(firstAccompagnement?.resume)}
            </div>
            <div>
              {firstAccompagnement?.photo && (
                <img
                  src={firstAccompagnement?.photo}
                  width={200}
                  height={260}
                  alt=""
                  className="w-full h-full"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Statistics />

      <div className="bg-white my-14">
        <div className="w-[60%] mx-auto text-center text-black max-sm:w-[90%]">
          <h3 className="text-4xl text-gray-600 my-10 font-bold max-sm:text-xl">
            Environnement et <span className="text-green-800">Justice</span>{" "}
            climatique
          </h3>

          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <div>
              {firstEnvironment?.photo && (
                <img
                  src={firstEnvironment?.photo}
                  width={200}
                  height={260}
                  alt=""
                  className="w-full h-full"
                  loading="lazy"
                />
              )}
            </div>
            <div className="text-2xl text-start text-gray-500 max-sm:text-sm">
              {/* Ce programme est dédié à la défense des droits fonciers, de
              l’environnement, et à la protection juridique des défenseurs des
              droits humains et environnementaux. ACEDH agit en faveur de celles
              et ceux qui, souvent au péril de leur liberté ou de leur vie, se
              battent pour préserver les forêts, les terres, les rivières et les
              droits des communautés locales. Alors que les pressions liées à
              l’exploitation minière, forestière et agricole s’intensifient en
              RDC, de nombreuses communautés et activistes sont victimes
              d’intimidations, d’arrestations arbitraires, d’expulsions
              illégales ou de violences. Le programme vise à leur offrir un
              accompagnement juridique solide, et à porter leur voix dans les
              espaces de décision nationaux et internationaux. */}
              {formatResume(firstEnvironment?.resume)}
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div className="w-[60%] mx-auto text-center text-black my-14"></div>
      <Footer />
    </div>
  );
};

export default ProgramPage;
