import Footer from "../components/footer";
// import { useToast } from "../components/toast-context";
import { useContacts } from "../features/contact/hooks/use-contacts";
import Header from "../components/header";
import FormContact from "../features/contact/component/form-contact";

const ContactPage = () => {
  const { contacts, loading } = useContacts();
  return (
    <div className="bg-zinc-50">
      <Header />
      <div className="bg-white">
        <div className="w-[60%] mx-auto text-center text-black">
          <div className="mt-10 text-[#803f1f] text-sm font-semibold">
            NOUS CONTACTER
          </div>
          <h3 className="text-4xl text-gray-600 my-10 font-bold">
            Avez-vous une <span className="text-green-700">préoccupation</span>{" "}
            ?
          </h3>

          <div className="grid grid-cols-2 gap-3 my-10 text-start">
            <div className="flex flex-col gap-10 sm:gap-6">
              <div>
                <h4 className="text-black">Adresse physique : </h4>
                <p className="text-gray-500">
                  RDC, Nord Kivu, Ville de Goma, C. Goma, Q. Katindo, Av.
                  Circulaire N° 95,3ème Niveau , Immeuble RUKERA
                </p>
              </div>
              <div>
                <h4 className="text-black">Adresse email : </h4>
                <p className="text-gray-500">contact@acedh.org</p>
              </div>
              <div>
                <h4 className="text-black">Telephone : </h4>
                {/* <p className="text-gray-500">+243 999 036 894 </p>
                 */}
                {loading && (
                  <p className="text-green-700 text-sm text-center">
                    Chargement ...
                  </p>
                )}
                {contacts.map((ct) => (
                  <p className="text-gray-500" key={ct.id}>
                    {ct.telephone}
                  </p>
                ))}
              </div>
            </div>

            <FormContact />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
