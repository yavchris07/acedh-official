export type Router = {
  path: string;
  element: React.ReactNode;
};

export type Accompagnement = {
  id: number;
  titre: string;
  resume: string;
  photo: string;
  fichier_pdf: string;
};

export type Activity = {
  id: number;
  titre: string;
  resume: string;
  photo: string;
  date_upload: string;
};

export type Adress = {
  id: number;
  adresse: string;
};

export type User = {
  id: number;
  email: string;
  password: string;
};

export type Comment = {
  nom: string;
  contenu: string;
  approuve: boolean;
  article: number;
};

export type Contact = {
  id: number;
  telephone: string;
};

export type Environment = {
  id: number;
  titre: string;
  resume: string;
  photo: string;
  fichier_pdf: string;
};

export type Gallery = {
  id: number;
  detail_activite: string;
  photo: string;
};

export type Mail = {
  id: number;
  prenom: string;
  noms: string;
  mail: string;
  message?: string;
};

export type Partner = {
  id: number;
  logo: string;
};

export type Project = {
  id: number;
  titre: string;
  resume: string;
  date_debit: string;
  date_fin: string;
};

export type Report = {
  fichier_pdf: string;
  commentaire: string;
  type_document: string;
  projet: number;
  id: number;
  date_upload: string;
  page_garde: string;
};

export type Resource = {
  id: number;
  titre: string;
  fichier_pdf: string;
};

export type Scrap = {
  source_domain: string;
  title: string;
  url: string;
  is_pdf: number;
  id: number;
  snippet: string;
  discovered_at: string;
};

export type Stat = {
  id: number;
  titre: string;
  estimation: string;
};

export type Team = {
  id: number;
  noms: string;
  fonction: string;
  image: File | null; // URL ou File
};

