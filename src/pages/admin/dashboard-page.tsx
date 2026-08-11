import AdminCard from "../../components/admin-card";
import Container from "../../components/container";
import { useFetchActivities } from "../../features/activity/hooks/use-fetch-activities";
import { useGallery } from "../../features/gallery/hooks/use-fetch-gallery";
import { useMailLists } from "../../features/mail-list/hooks/use-mal-lists";
import { usePartners } from "../../features/partner/hooks/use-fetch-partners";
import { useProjects } from "../../features/project/hooks/use-projects";
import { useReports } from "../../features/rapport/hooks/use-reports";
import type { Mail } from "../../utils/type";

const DashboardPage = () => {

  const { galleries } = useGallery();
  const { activities } = useFetchActivities();
  const { reports } = useReports();
  const { mails } = useMailLists();
  const { partners } = usePartners();
  const { projects } = useProjects();

  return (
    <Container>
      <div className="grid grid-cols-3 gap-4">
        <AdminCard card={{ title: "Projets", value: projects.length }} />
        <AdminCard card={{ title: "Rapports", value: reports.length }} />
        <AdminCard card={{ title: "Articles", value: activities.length }} />
        <AdminCard card={{ title: "Galleries", value: galleries.length }} />
        <AdminCard card={{ title: "partenaires", value: partners.length }} />
        <AdminCard card={{ title: "Liste mails", value: mails.length }} />
      </div>
      <div className="mt-4">
        {mails.length > 0 &&
          mails.map((mail: Mail) => (
            <div key={mail.id} className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-blue-600"></div>
              <div>
                <span className="text-sm text-gray-800">{mail.noms}</span>
                <p className="text-xs text-gray-600">{mail.mail}</p>
              </div>
            </div>
          ))}
        <div>
          {mails.length === 0 && (
            <p className="text-sm text-green-700 text-center italic p-4">
              Aucune adresse mail pour le moment.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default DashboardPage;
