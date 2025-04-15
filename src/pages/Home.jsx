import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();

	const fetchContacts = async () => {
		try {
			// 👉 Hacemos la petición GET
			// fetch por defecto hace una petición GET, por eso no necesitamos especificar el método
			const response = await fetch(
				"https://playground.4geeks.com/contact/agendas/angel"
			);

			// 👉 Verificamos si la petición fue exitosa
			if (!response.ok) {
				throw new Error("¡Vaya! No hemos podido obtener los contactos");
			}

			// 👉 Convertimos la respuesta a JSON
			const data = await response.json();

			dispatch({
				type: "set_contacts",
				payload: data.contacts
			})


		} catch (error) {
			console.log(error)
		}
	};

	useEffect(() => {
		fetchContacts(); // Ejecuto a la función
	}, []);

	function contactsExist ( ) {
		if (store.contacts.length === 0) {
			return (
				<h2>No se han encontrado contactos</h2>
			)
		}

		return (
			store.contacts.map((contact, index) => {
				return (
					<div className=" mb-2 mx-auto" key={index}>
						<ContactCard
							contactName={contact.name}
							contactEmail={contact.email}
							contactPhone={contact.phone}
							contactAddress={contact.address}
							contactId={contact.id}
						/>
					</div>
				)
			})
		)
	}

	return (

		<div className="text-center mt-5">
			<div className="container">
				<button className="btn btn-success" onClick={() => { navigate("/add") }}> + Add Contact </button>
			</div>
			<div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
					{contactsExist()}
				</div>
		</div>
	);
}; 