import { LogOutIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { Sidebar } from "./sidebar";

type containerProps = { children: ReactNode };

const Container = ({ children }: containerProps) => {
  const location = useLocation();
  const active = location.pathname;

  const [user, setUser] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useNavigate();

  console.log("Location pathname : ", active);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("userEmail");

  //   console.log("User platform :", storedUser);

  //   if (!storedUser) {
  //     router("/auth");
  //     return;
  //   }

  //   setTimeout(() => {
  //     setUser(storedUser);
  //     setLoading(false);
  //   }, 0);
  // }, [router]);

  // const logOut = () => {
  //   localStorage.removeItem("userEmail");
  //   router("/auth");
  // };

  useEffect(() => {
    const storedUser = localStorage.getItem("userEmail");
    if (!storedUser) {
      router("/auth", { replace: true });
      return;
    }
    setTimeout(() => {
      setUser(storedUser);
      setLoading(false);
    }, 0);
    // setUser(storedUser);
    // setLoading(false);
  }, [router]);

  const logOut = () => {
    localStorage.removeItem("userEmail");
    setUser('');
    router("/auth", { replace: true });
  };

  console.log(user);

  if (loading) {
    return (
      <div className="bg-zinc-50">
        <p className="text-green-700 text-sm text-center">
          Verification de l&apos;authenticite de l&apos;utilisteur...
        </p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar path={active} />

      <div className="flex-1 p-6">
        <div className="mb-6 flex justify-between items-center border-b-2 border-gray-200 pb-4">
          <h1 className="text- font-semibold text-gray-500">
            {active === "Dashboard" ? "Tableau de Bord" : active}
          </h1>
          <button
            className="bg-red-700 text-white px-1 py-1 rounded cursor-pointer"
            onClick={logOut}
          >
            <LogOutIcon size={15} className="inline-block mr-2" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Container;

//   const renderContent = () => {
//     switch (active) {
//       case "Users":
//         return <UserPage />;
//       case "Equipes":
//         return <TeamPage />;
//       case "Activités":
//         return <ActivityPage />;
//       case "Galleries":
//         return <GalleryPage />;
//       case "Partenaires":
//         return <PartnerPage />;
//       case "Rapports":
//         return <ReportPage />;
//       case "Liste de mails":
//         return <MailListPage />;
//       case "Projets":
//         return <ProjectPage />;
//     //   case "Commentaires":
//     //     return <CommentsPage />;
//       case "Ressources":
//         return <ResourcePage />;
//       case "Footer":
//         return <FooterPage />;
//     //   case "Apropos":
//     //     return <ObjectivePage />;
//       case "Mission":
//         return <StatisticsPage />;
//       default:
//         return <Dashboard />;
//     }
//   };
