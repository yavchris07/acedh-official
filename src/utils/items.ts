import {
  Home,
  Users,
  FileText,
  Folder,
  GalleryHorizontalEnd,
  Mail,
  // MessageCircle,
  Handshake,
  GaugeCircle,
  CirclePile,
  Footprints,
  LayoutList,
  ChartNoAxesColumnDecreasing,
  Flower,
} from "lucide-react";

export const items = [
  { name: "Dashboard", icon: Home, path: "/dashboards" },

  { name: "Utilisateurs", icon: Users, path: "/admin/users" },
  { name: "Equipes", icon: CirclePile, path: "/admin/teams" },
  { name: "Projets", icon: Folder, path: "/admin/projects" },
  { name: "Rapports", icon: FileText, path: "/admin/reports" },
  { name: "Activités", icon: Folder, path: "/admin/activity" },
  { name: "Galleries", icon: GalleryHorizontalEnd, path: "/admin/galery" },
  { name: "Partenaires", icon: Handshake, path: "/admin/partners" },
  { name: "Liste de mails", icon: Mail, path: "/admin/mail-list" },
  // { name: "Commentaires", icon: MessageCircle },
  { name: "Ressources", icon: GaugeCircle, path: "/admin/resources" },
  { name: "Statistiques", icon: ChartNoAxesColumnDecreasing, path: "/admin/statistics" },
  {
    name: "Accompanement",
    icon: LayoutList,
    path: "/admin/accompagnement",
  },
  {
    name: "Environement",
    icon: Flower,
    path: "/admin/environement",
  },
  { name: "Footer", icon: Footprints, path: "/admin/footer" },
];

