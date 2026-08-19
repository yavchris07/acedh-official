import Footer from "../components/footer";
import Header from "../components/header";
import Statistics from "../components/statistics";
import TeamItem from "../components/team-item";
import { useTeamMembers } from "../features/team/hooks/use-fetch-team-members";

const AboutPage = () => {
   const { teamMembers, loading } = useTeamMembers();
  return (<div className="bg-zinc-50">
      <Header />
      <div className="bg-white">
        <div className="w-[60%] mx-auto text-center text-black max-sm:w-[90%]">
          <div className="mt-10 text-green-700 text-sm font-semibold">
            A PROPOS
          </div>
          <h3 className="text-4xl text-gray-600 my-10 font-bold max-sm:text-xl">
            A PROPS DE <span className="text-green-800">L&apos;ACEDH </span>
            <strong className="text-orange-900"> - </strong>
            RDC
          </h3>

          <div className="text-gray-500 text-xl max-sm:text-sm">
            <p className="my-4 ">
              Nous avons comme objectif, Mettre les savoirs juridiques et
              communautaires pour la protection de la nature et des droits des
              plus pauvres.
            </p>

            <p className="my-4">
              Nous reposons nos actions sur des piliers communautaires axés sur
              la gouvernance foncière.
            </p>
            <p className="my-4">
              Un monde plus juste où les êtres et leur environnement sont au
              centre de la gouvernance et de la prise de décision.
            </p>
          </div>

          <div className="mt-10 text-orange-900 text-[20px] my-2 font-semibold max-sm:text-xl">
            EN CHIFFRES
          </div>
        </div>

        <Statistics />
        <div className="w-[60%] mx-auto text-center text-black max-sm:w-[90%]">
          <div className="text-gray-500 text-xl my-6 text-start max-sm:text-sm">
            <p className="my-2 ">
              L’ACEDH-RDC: créée en 2008, au Nord Kivu , en République
              démocratique du Congo, est une organisation de sauvegarde de
              l’environnement et des droits de l’homme qui a pour vision nous
              reposons nos actions sur des piliers communautaires axés sur la
              gouvernance foncière, lutte contre l’impunité de l’exploitation et
              trafic illicite de la faune et flore sauvage, plaidoyer et
              influencer des politiques sur les réformes juridiques et
              institutionnelles en matière de conservation de la nature,
              gouvernance foncière, gouvernance forestière , protection de la
              faune et flore sauvage, accès et sécurisation des droits fonciers
              locaux , protection des défenseurs des droits fonciers et de
              l’environnement , investissements agricoles verts, gouvernance
              énergétiques l’accès à la justice. Dans le souci de mettre les
              savoirs juridiques et communautaires pour la protection de la
              nature et des droits des plus pauvres.
            </p>
            <p className="my-2">
              La sécurisation du patrimoine foncier des communautés locales, la
              protection des défenseurs des droits fonciers et de
              l’environnement sont des facteurs clés pour la préservation de
              l’environnement et des droits de l’homme dans une région où la
              terre est la principale ressource des membres de la
              communauté.C’est dans ce cadre ci, que nous menons différentes
              activités de support et de plaidoyer en faveur de la lutte contre
              l’exploitation et le trafic illicite de la faune et flore sauvage,
              le maintien de l’intégrité des parcs nationaux et forêts contre
              l’exploitation et l’extraction du pétrole et aspects connexes.
            </p>
            <p className="my-2">
              L’ACEDH-RDC est la toute première Organisation de la Société
              Civile du Nord Kivu a pensé mettre n place un Task Force des
              Avocats Verts pour assurer une défense légale en faveur de la
              faune et flore sauve en collaboration avec le Parc National des
              Virunga. Elle aussi engagé un partenariat avec les forces armés de
              la RDC, via la Division du service d’Education Civique,
              patriotique et action Sociale SCAS pour une mobilisation des
              éléments de l’armée en pleine opération militaire pour un
              patriotisme écologique visant à protéger la faune et flore sauvage
              du Parc National des Virunga.
            </p>

            <p className="my-2">
              Par sa vision, L’Alerte Congolaise pour l’Environnement et les
              Droits de l’Homme (ACEDH-RDC) envisage un monde plus juste où les
              êtres et leur environnement sont au centre de la gouvernance et de
              la prise de décision. ACEDH fait campagne pour la protection de
              l’environnement et des droits de l’homme, en se concentrant sur la
              justice environnementale, la protection communautaire des zones de
              conservation et une gouvernance responsable et transparente du
              régime foncier, pêche et énergique.
            </p>
            <p className="my-2">Les axes d’interventions d’ACEDH-RDC sont :</p>
            <div>
              {[
                "Application des lois pour la faune et la flore sauvages;",
                "Domaine Foncier;",
                "Energie;",
                "Ressources naturelles et Environnement;",
                "Protection des DDHE et DDF;",
              ].map((_, i) => (
                <p key={i}>● {_}</p>
              ))}
            </div>
            <p className="my-2">
              L’ACEDH-RDC applique une approche juridico-socio-anthropologique
              pour la sauvegarde sociale, économique, environnementale pro
              pauvres et pro nature au service de l’humanité.
            </p>
          </div>

          <div className="flex items-center gap-2 my-10">
            <div className="w-1 h-10 bg-orange-900 max-sm:h-5"></div>
            <h3 className="text-4xl font-bold text-gray-800 max-sm:text-xl">Notre Equipe</h3>
          </div>

          <div className="my-10 pt-10 pb-20 max-sm:flex-col">
            {loading && <p>Chargement ...</p>}
            <ul className="flex flex-wrap gap-3 ">
              {teamMembers.map((teamMember) => (
                <li key={teamMember.id}>
                  {" "}
                  <TeamItem item={teamMember} />{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>);
};

export default AboutPage;

// const AboutPage = () => {
//  
//   return (
    
//   );
// };
