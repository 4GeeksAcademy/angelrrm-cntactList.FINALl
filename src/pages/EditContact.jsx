import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const EditContact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const { contact_id } = useParams();
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        // Despachar la acción para encontrar el contacto
        dispatch({
            type: "find_contact",
            payload: contact_id  // Solo enviar el ID, no un objeto
        });
    }, [dispatch, contact_id]);

    // Efecto separado para actualizar los campos cuando foundContact cambia
    useEffect(() => {
        // Verificar que foundContact existe y tiene datos
        if (store.foundContact && Object.keys(store.foundContact).length > 0) {
            setName(store.foundContact.name || "");
            setEmail(store.foundContact.email || "");
            setPhone(store.foundContact.phone || "");
            setAddress(store.foundContact.address || "");
        }
    }, [store.foundContact]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // Hacemos la petición PUT
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/angel/contacts/${contact_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        address
                    }),
                }
            );

            if (!response.ok) throw new Error("Error al actualizar el contacto");

            alert('Contacto actualizado con éxito');
            navigate("/");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        aria-describedby="fullName"
                        placeholder="Angel Ramos"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="angel@ramos.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="+34 000 00 00 00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Plaza del Sol, Madrid"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-warning">Edit Contact</button>
            </form>
        </div>
    );
};

export default EditContact;