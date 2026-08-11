import type { Partner } from "../utils/type";

type partnerItemProps = {
  partner: Partner;
};

const PartnerItem = ({ partner }: partnerItemProps) => {
  console.log(partner.id);
  return (
    <div className="w-auto h-auto rounded-full">
      {partner.logo && (
        <img
          src={partner.logo}
          alt="logo"
          width={100}
          height={120}
          className="w-auto h-auto object-cover rounded-full"
          loading="lazy"
          // priority
        />
      )}
    </div>
  );
};

export default PartnerItem;




// "use server";

// import { getTranslations } from "next-intl/server";
// import { MEMBERS } from "@/data/members";
// import { GithubCarousel } from "./GithubCarousel";

// async function getContributorData(username: string) {
//   try {
//     // Fetch info profil
//     const [userRes, contribRes] = await Promise.all([
//       fetch(`https://api.github.com/users/${username}`, {
//         next: { revalidate: 86400 },
//       }),
//       fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
//         next: { revalidate: 86400 },
//       }),
//     ]);

//     if (!userRes.ok) return null;
//     const user = await userRes.json();
//     const contribs = contribRes.ok
//       ? await contribRes.json()
//       : { totalContributions: 0 };

//     return { ...user, totalContributions: contribs.totalContributions };
//   } catch {
//     return null;
//   }
// }

// export default async function GithubSection() {
//   const t = await getTranslations("github");
//   const contributors = await Promise.all(
//     MEMBERS.map((m) => getContributorData(m.githubUser)),
//   );

//   // On filtre les résultats invalides et on trie par contributions
//   const validContributors = contributors
//     .filter((c) => c !== null)
//     .sort((a, b) => b.totalContributions - a.totalContributions);

//   // On prépare les textes ici, côté serveur
//   const labels = {
//     profile: t("profile"),
//     contributions: t("contributions"),
//     contribution_singular: t("contribution_singular"),
//   };

//   if (validContributors.length === 0) return null;

//   return (
//     <section className="py-24 bg-background border-t border-border relative overflow-hidden">
//       <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
//         <h2 className="text-4xl font-black mb-12 text-foreground">
//           {t("title")} Test
//         </h2>
//         <GithubCarousel contributors={validContributors} labels={labels} />
//       </div>
//     </section>
//   );
// }

