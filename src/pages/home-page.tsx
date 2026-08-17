import { useState } from "react";
import drill from "../assets/drill.avif";
import EventCarousel from "../components/event-caroussel";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";
import HomeArticle from "../components/home-article";
import PartnersList from "../components/partners-list";
import Statistics from "../components/statistics";
import TeamItem from "../components/team-item";
import TheyTrust from "../components/they-trust";
import WhatWeDo from "../components/what-we-do";
import { usePartners } from "../features/partner/hooks/use-fetch-partners";
import { useScrapping } from "../features/scrapping/hooks/use-scrappings";
import { useTeamMembers } from "../features/team/hooks/use-fetch-team-members";
import { axes } from "../utils/axes";
import PriorityAxeCard from "../components/priority-axe-card";

const HomePage = () => {
  const { partners } = usePartners();
  const { teamMembers, loading } = useTeamMembers();
  const { scraps } = useScrapping();

  const [isAvailble] = useState(false)

  // const today = new Date();

  // const isAugust13 =
  //   today.getFullYear() === 2026 &&
  //   today.getMonth() === 7 && // août = 7
  //   today.getDate() === 10;

  if (isAvailble) {
    return (
      <div className="text-center mt-56">
        {" "}
        <img src="" />
        <h1 className="text-red-500 text-2xl font-semibold my-4">Le problème d'hébergement web</h1>{" "}
        <span className="text-gray-500">
          Veuilez contacter IT Manager de l'organisation ou l'équipe d'<strong>Alt Space</strong>.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100 font-sans">
      <Header />
      {/* <Navbar/> */}
      <Hero />
      <EventCarousel />
      <HomeArticle />
      <Statistics />
      <WhatWeDo />

      <div className="bg-white">
        <div className="w-[70%] mx-auto grid grid-cols-2 py-10 max-sm:grid-cols-1 max-sm:w-[97%] max-sm:gap-10">
          <div className="text-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-10 bg-[#803f1f]"></div>
              <h3 className="text-4xl font-bold text-gray-800 max-sm:text-2xl">
                Nos axes prioritaires
              </h3>
            </div>
            <p className="my-4">
              {" "}
              L’Alerte Congolaise pour l’Environnement et les Droits de l’Homme
              est la toute première Organisation de la Société Civile du Nord
              Kivu.
            </p>
            
             <div>
              {axes.map((axe)=> <PriorityAxeCard axe={axe} />)}
            </div>

            {/* à penser mettre en place une Task Force des Avocats Verts
              pour assurer une défense légale en faveur de la faune et flore
              sauve en collaboration avec le Parc National des Virunga. */}

              
          </div>
          <div>
            <img
              src={drill}
              width={200}
              height={220}
              alt="image"
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="w-[70%] mx-auto">
        <div className="flex items-center gap-2 my-10">
          <div className="w-1 h-10 bg-orange-900"></div>
          <h3 className="text-4xl font-bold text-gray-800">Notre Equipe</h3>
        </div>
        <div className="my-10 pt-10 pb-20">
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

      <PartnersList partners={partners} />
      <TheyTrust scraps={scraps} />
      <Footer />
    </div>
  );
};

export default HomePage;
