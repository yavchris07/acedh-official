import { useCallback, useEffect, useState } from "react";
import { teamApi } from "../api";
import type { Team } from "../../../utils/type";

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await teamApi.getAll();
      setTeamMembers(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTeamMembers();
  }, []);

  return { teamMembers, loading, error, refresh: fetchTeamMembers };
};

// import { useState } from "react";
// import { Subscribe } from "../api/type";
// import { subscriptionApi } from "../api";

// export const useUpdateSubscription = (idc:number) => {
//     const [load, setLoading] = useState(false);
//     const [er, setError] = useState("");

//     const updateSubscription = async (id: number, data: Subscribe) => {
//         try {
//             setLoading(true);
//             setError("");
//             const result = await subscriptionApi.update(id, data, idc);
//             return result;
//         } catch (err) {
//             if (err instanceof Error)
//                 setError(err.message);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { updateSubscription, load, er };
// };

// import { useState } from "react";
// import { Subscribe } from "../api/type";
// import { subscriptionApi } from "../api";

// export const useCreateSubscription = (idc: number) => {
//     const [pending, setLoading] = useState(false);
//     const [fail, setError] = useState("");

//     const createSubscription = async (data: Subscribe) => {
//         try {
//             setLoading(true);
//             setError("");
//             return await subscriptionApi.create(data, idc);
//         } catch (err) {
//             if (err instanceof Error) {
//                 setError(err.message);
//             }
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { createSubscription, pending, fail };
// };

// import { useState } from "react";
// import { userApi } from "../api";

// export const useDeleteUser = () => {
//     const [pending, setLoading] = useState(false);
//     const [er, setError] = useState("");

//     const deleteUser = async (id: number) => {
//         try {
//             setLoading(true);
//             setError("");
//             await userApi.delete(id);
//         } catch (err) {
//             if (err instanceof Error) {
//                 setError(err.message);
//                 console.error("DeleteChurch error:", err);
//             }
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { deleteUser, pending, er };
// };

// const UsersPage = () => {
//   const [isAdding, setIsAdding] = useState(false);

//   // source
//   const { churches } = useChurches();
//   const { users, loading, refresh, error } = useUsers();
//   const { updateUser, load, err } = useUpdateUser();
//   const {deleteUser,pending,er} = useDeleteUser()

//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [modal, setModal] = useState<"edit" | "delete" | null>(null);

//   const handleEdit = (user: User) => {
//     setSelectedUser(user);
//     setModal("edit");
//   };

//   const handleDelete = (user: User) => {
//     setSelectedUser(user);
//     setModal("delete");
//   };

//   const onClose = () => {
//     setIsAdding(false);
//   };

//   const handleUpdateConfirm = async (id: number, data: User) => {
//     await updateUser(id, data);
//     refresh();
//   };

//   const handleDeleteConfirm = async (id: number) => {
//     await deleteUser(id);
//     refresh();
//   };

//   return (
//     <Layout>
//       <Banner title="Liste-utilisateurs" subTitle="Prosphora manager app." />

//       <TableContainer>
//         <div className="table-title">
//           <div className="search">
//             <input type="search" placeholder="Recherche ..." />
//           </div>
//           <span onClick={() => setIsAdding(true)}>Ajouter utilisateur</span>
//         </div>

//         {users.length < 0 && (
//           <Empty message="Aucun utilisateur n'est enregistré pour le moment." />
//         )}

//         {loading && <Loading />}

//         {error && (
//           <ErrorMessage
//             message="Erreur de changements de données, veuillez vérifier la connexion internet de votre appareil !"
//             refresh={refresh}
//           />
//         )}
//         <UserList
//           users={users}
//           churches={churches}
//           onDelete={handleDelete}
//           onEdit={handleEdit}
//         />
//       </TableContainer>

//       {isAdding && <AddUser onSuccess={refresh} onClose={onClose} />}

//       {/* Modals */}
//       {modal === "edit" && selectedUser && (
//         <EditUserModal
//           user={selectedUser}
//           isLoading={load}
//           fail={err}
//           onConfirm={handleUpdateConfirm}
//           churches={churches}
//           onClose={() => setModal(null)}
//         />
//       )}

//       {modal === "delete" && selectedUser && (
//         <DeleteUserModal
//           user={selectedUser}
//           isLoading={pending}
//           fail={er}
//           onConfirm={handleDeleteConfirm}
//           onClose={() => setModal(null)}
//         />
//       )}
//     </Layout>
//   );
// };

// export default UsersPage;

// import { useState } from "react";
// import Alert from "../../../components/alert";
// import Button from "../../../components/button";
// import PopUpLayout from "../../../components/pop-up-layout";
// import { User } from "../types";
// import { Church } from "../../church/types";
// import toast from "react-hot-toast";

// type Props = {
//   user: User;
//   churches: Church[];
//   isLoading: boolean;
//   fail: string;
//   onConfirm: (id: number, data: User) => void;
//   onClose: () => void;
// };

// const EditUserModal = ({
//   user,
//   churches,
//   isLoading,
//   fail,
//   onConfirm,
//   onClose,
// }: Props) => {
//   const [form, setForm] = useState({
//     id: user.id,
//     nom: user.nom,
//     num_phone: user.num_phone,
//     role: user.role,
//     eglise: user.eglise,
//     password: user.password,
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       onConfirm(user.id, form);
//       toast.success("Mise à jour réussie");
//       onClose();
//     } catch (err) {
//       console.log("Ui err ", err);
//     }
//   };

//   const rols = [
//     { id: "admin", name: "Admin" },
//     { id: "gestionnaire", name: "Gestionnaire " },
//     { id: "pasteur", name: "Pasteur" },
//     { id: "comptable", name: "Comptable " },
//     { id: "caissier", name: "Caissier" },
//   ];

//   const handleRolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setForm({ ...form, role: event.target.value });
//   };

//   const handleChurchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setForm({ ...form, eglise: event.target.value });
//   };

//   return (
//     <PopUpLayout>
//       <div className="head">
//         <h3>MODIFICATION UTILISATEUR</h3>
//         <p onClick={onClose}>X</p>
//       </div>
//       <div className="form">
//         <form onSubmit={handleSubmit}>
//           <div className="control">
//             <span className="label">Nom</span>
//             <input
//               type="text"
//               placeholder="Nom"
//               value={form.nom}
//               onChange={(e) => setForm({ ...form, nom: e.target.value })}
//             />
//           </div>
//           <div className="control">
//             <span className="label">Email</span>
//             <input
//               type="text"
//               placeholder="Numero"
//               value={form.num_phone}
//               onChange={(e) => setForm({ ...form, num_phone: e.target.value })}
//             />
//           </div>
//           <div className="control">
//             <span className="label">Eglise</span>
//             <select
//               value={form.eglise}
//               name="eglise"
//               onChange={handleChurchChange}
//             >
//               <option value="">Eglise</option>
//               {churches.map((c) => {
//                 return (
//                   <option value={c.id} key={c.id}>
//                     {c.nom}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//           <div className="control">
//             <span className="label">Rôle</span>
//             <select value={form.role} name="role" onChange={handleRolChange}>
//               <option value="">Role</option>
//               {rols.map((r) => {
//                 return (
//                   <option value={r.id} key={r.id}>
//                     {r.name}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//           <input
//             type="text"
//             name="password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//           <Button isLoading={isLoading} title="Modifier" />
//         </form>
//         {fail && <Alert cls="fail" />}
//       </div>
//     </PopUpLayout>
//   );
// };

// export default EditUserModal;

// import { useState } from "react";
// import PopUpLayout from "@/components/pop-up-layout";
// import Button from "@/components/button";
// import { User, Church } from "@/types";

// type Props = {
//   user: User;
//   churches?: Church[];
//   onClose: () => void;
//   onSubmit?: (data: Partial<User>) => void;
// };

// const EditModal = ({ user, churches = [], onClose, onSubmit }: Props) => {
//   const [form, setForm] = useState({
//     nom: user.nom,
//     num_phone: user.num_phone,
//     role: user.role,
//     eglise: user.eglise,
//   });

//   const handleChange = (field: string, value: any) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (onSubmit) {
//       onSubmit({
//         ...form,
//         id: user.id,
//       });
//     }

//     onClose();
//   };

//   return (
//     <PopUpLayout>
//       <div className="form">
//         <div className="title">
//           <h3>
//             MODIFICATION : <span>{user.nom}</span>
//           </h3>
//           <p onClick={onClose}>X</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="control">
//             <span>Nom</span>
//             <input
//               value={form.nom}
//               onChange={(e) => handleChange("nom", e.target.value)}
//             />
//           </div>

//           <div className="control">
//             <span>Téléphone</span>
//             <input
//               value={form.num_phone}
//               onChange={(e) =>
//                 handleChange("num_phone", e.target.value)
//               }
//             />
//           </div>

//           <div className="control">
//             <span>Rôle</span>
//             <input
//               value={form.role}
//               onChange={(e) => handleChange("role", e.target.value)}
//             />
//           </div>

//           <div className="control">
//             <span>Église</span>
//             <select
//               value={form.eglise}
//               onChange={(e) =>
//                 handleChange("eglise", Number(e.target.value))
//               }
//             >
//               <option value="">Choisir</option>
//               {churches.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.nom}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <Button title="Modifier" type="submit" />
//         </form>
//       </div>
//     </PopUpLayout>
//   );
// };

// export default EditModal;
