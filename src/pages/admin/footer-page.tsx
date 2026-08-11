import React, { useState } from "react";
import AdressList from "../../features/adress/component/adress-list";
import CreateAdress from "../../features/adress/component/create-adress";
import DeleteAdress from "../../features/adress/component/delete-adress";
import UpdateAdress from "../../features/adress/component/update-adress";
import { useAdresses } from "../../features/adress/hooks/use-adresses";
import ContactList from "../../features/contact/component/contact-list";
import CreateContact from "../../features/contact/component/create-contact";
import { DeleteContact } from "../../features/contact/component/delete-contact";
import UpdateContact from "../../features/contact/component/update-contact";
import { useContacts } from "../../features/contact/hooks/use-contacts";
import type { Contact, Adress } from "../../utils/type";
import Container from "../../components/container";

const FooterPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openContact, setOpenContact] = React.useState(false);
  const [modalContact, setModalContact] = React.useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [openAdresse, setOpenAdress] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [selectedAdress, setSelectedAdresss] = useState<Adress | null>(null);

  const { contacts, loading, refresh, error } = useContacts();
  const {
    adresses,
    loading: load,
    error: err,
    refresh: refreshAdresses,
  } = useAdresses();

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setOpenContact(true);
  };
  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setModalContact(true);
  };

  const onModalOpen = () => {
    setIsModal(false);
    refresh();
  };

  const handleEditAdress = (adress: Adress) => {
    setSelectedAdresss(adress);
    setOpenAdress(true);
  };
  const handleDeleteAdress = (adress: Adress) => {
    setSelectedAdresss(adress);
    setModal(true);
  };

  return (
    <Container >
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord /{" "}
          <span className="font-normal"> Footer / Contact </span>{" "}
        </h1>
        <span
          onClick={() => setIsModal(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition flex items-center gap-2"
        >
          +
        </span>
      </div>

      {/* contact */}

      <CreateContact
        open={isModal}
        onClose={() => onModalOpen()}
        refresh={refresh}
      />
      {loading && (
        <div className="p-10 text-center text-green-700">
          Chargement des contacts...
        </div>
      )}
      {error && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}
      {contacts.length > 0 ? (
        <ContactList
          contacts={contacts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        ""
      )}

      {openContact && selectedContact && (
        <UpdateContact
          contact={selectedContact}
          onRefresh={refresh}
          onClose={() => setOpenContact(false)}
          open={openContact}
        />
      )}

      {modalContact && selectedContact && (
        <DeleteContact
          contact={selectedContact}
          onRefresh={refresh}
          onClose={() => setModalContact(false)}
          open={modalContact}
        />
      )}

      <div className="mb-6 mt-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord /{" "}
          <span className="font-normal"> Footer / Adresse</span>{" "}
        </h1>
        <span
          onClick={() => setIsOpen(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition flex items-center gap-2"
        >
          +
        </span>
      </div>

      {/* Adress */}
      <CreateAdress
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onRefresh={refresh}
      />
      {load && (
        <div className="p-10 text-center text-green-700">
          Chargement des adresses...
        </div>
      )}
      {err && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}
      {adresses.length > 0 ? (
        <AdressList
          adresses={adresses}
          onEdit={handleEditAdress}
          onDelete={handleDeleteAdress}
        />
      ) : (
        "Aucune adresse !"
      )}

      {openAdresse && selectedAdress && (
        <UpdateAdress
          adress={selectedAdress}
          onRefresh={refreshAdresses}
          onClose={() => setOpenAdress(false)}
          open={openAdresse}
        />
      )}

      {modal && selectedAdress && (
        <DeleteAdress
          adress={selectedAdress}
          onRefresh={refreshAdresses}
          onClose={() => setModal(false)}
          open={modal}
        />
      )}
    </Container>
  );
};

export default FooterPage;
