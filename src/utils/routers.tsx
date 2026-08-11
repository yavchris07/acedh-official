import AboutPage from "../pages/about-page";
import AccompagnementPage from "../pages/admin/accompagnement-page";
import ActivityPage from "../pages/admin/activity-page";
import AuthPage from "../pages/admin/auth-page";
import DashboardPage from "../pages/admin/dashboard-page";
import EnvironnementPage from "../pages/admin/Environnement-page";
import FooterPage from "../pages/admin/footer-page";
import GalleryPage from "../pages/admin/galery-page";
import MailListPage from "../pages/admin/mail-list-page";
import PartnerPage from "../pages/admin/partner-page";
import ProjectPage from "../pages/admin/project-page";
import AdminReportPage from "../pages/admin/report-page";
import AdminResourcePage from "../pages/admin/resource-page";
import StatisticsPage from "../pages/admin/statisctics-page";
import TeamPage from "../pages/admin/team-page";
import UserPage from "../pages/admin/user-page";
import ArticlePage from "../pages/article-page";
import BlogPage from "../pages/blog-page";
import ContactPage from "../pages/contact-page";
import GaleryPage from "../pages/galery-page";
import HomePage from "../pages/home-page";
import ProgramPage from "../pages/program-page";
import ReportPage from "../pages/report-page";
import ResourcePage from "../pages/resource-page";
import SingleReport from "../pages/single-report";
import type { Router } from "./type";

export const routers: Router[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/resource",
    element: <ResourcePage />,
  },
  {
    path: "/programs",
    element: <ProgramPage />,
  },
  {
    path: "/rapports",
    element: <ReportPage />,
  },
  {
    path: "/blogs",
    element: <BlogPage />,
  },
  {
    path: "/galeries",
    element: <GaleryPage />,
  },
  {
    path: "/article/:id",
    element: <ArticlePage />,
  },
  {
    path: "/rapport/:id",
    element: <SingleReport />,
  },
  {
    path: "/dashboards",
    element: <DashboardPage />,
  },
  {
    path: "/admin/activity",
    element: <ActivityPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/admin/galery",
    element: <GalleryPage />,
  },
  {
    path: "/admin/mail-list",
    element: <MailListPage />,
  },
  {
    path: "/admin/Partners",
    element: <PartnerPage />,
  },
  {
    path: "/admin/projects",
    element: <ProjectPage />,
  },
  {
    path: "/admin/reports",
    element: <AdminReportPage />,
  },
  {
    path: "/admin/resources",
    element: <AdminResourcePage />,
  },
  {
    path: "/admin/statistics",
    element: <StatisticsPage />,
  },
  {
    path: "/admin/teams",
    element: <TeamPage />,
  },
  {
    path: "/admin/users",
    element: <UserPage />,
  },
  {
    path: "/admin/footer",
    element: <FooterPage />,
  },
   {
    path: "/admin/accompagnement",
    element: <AccompagnementPage />,
  },
   {
    path: "/admin/environement",
    element: <EnvironnementPage />,
  },
];

// const protected = [{},{}];
// console.log(protected); SingleReport
