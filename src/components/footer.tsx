import { useAdresses } from "../features/adress/hooks/use-adresses";
import { useContacts } from "../features/contact/hooks/use-contacts";
import logo from "../assets/ACEDH.png";

const Footer = () => {
  const year = new Date();
  const menuItems = [
    { label: "À propos", href: "/about" },
    { label: "Nos Ressources", href: "/resource" },
    { label: "Nos Programmes", href: "/programs" },
    { label: "Nos Actualités", href: "/blog" },
    { label: "Notre Gallérie", href: "/galery" },
  ];

  const { contacts, loading } = useContacts();
  const { adresses, loading: loa } = useAdresses();
  return (
    <div className="text-black pt-10 bg-gray-200 mt-10">
      <div className="w-[70%] mx-auto max-sm:w-[97%]">
        <div className="grid grid-cols-4 gap-10 max-sm:grid-cols-1 max-sm:gap-10 max-sm:items-center">
          <div className="max-sm:flex items-center gap-7">
            <img src={logo} width={170} height={190} alt="logo" className="max-sm:w-50 max-sm:h-30"/>
            <p className="text-sm text-gray-500">
              Adresse physique :{" "}
              {/* <span>
                RDC, Nord Kivu, Ville de Goma, C. Goma, Q. Katindo, Av.
                Circulaire N° 95,3ème Niveau , Immeuble RUKERA
              </span>{" "} */}
              {adresses.map((adr) => (
                <span key={adr.id}>{adr.adresse}</span>
              ))}
            </p>
            {loa && <p className="text-gray-500 text-sm">Chargement ..</p>}
          </div>

          <ul className="flex flex-col gap-4 text-sm text-gray-500">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-orange-900"
              >
                {item.label}
              </a>
            ))}
          </ul>
          {/* Contact */}
          <div className="text-sm text-white">
            <h3 className="text-gray-700">Contacts</h3>
            <div>
              {loading && (
                <p className="text-gray-600 text-sm">Chargement ..</p>
              )}
              {contacts.map((ct) => (
                <p className="text-gray-500" key={ct.id}>
                  {" "}
                  {ct.telephone}
                </p>
              ))}
            </div>
          </div>

          {/* intervation */}
          <div className="text-gray-500 text-sm">
            <h3>Nos axes d’interventions : </h3>
            {[
              "Application des lois pour la faune et la flore sauvages;",
              "Domaine Foncier;",
              "Energie;",
              "Ressources naturelles et Environnement;",
              "Protection des DDHE et DDF;",
            ].map((_, i) => (
              <p key={i}> ● {_}</p>
            ))}
          </div>
        </div>
        <div className="border my-6 border-orange-900"></div>
      </div>
      <div className="bg-green-600 py-4">
        <div className="w-[70%] mx-auto max-sm:w-[97%]">
          <div className="max-sm:flex max-sm:items-center max-sm:justify-center">
            <p className="text-[12px] text-white max-sm:text-center">
              {" "}
              © {year.getFullYear()} | ACEDH-RDC Tous droits reservés | Réalisé
              par Alt Space
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
