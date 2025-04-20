import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        // Prevenimos que la página se recargue
        e.preventDefault();

        try {
            // 👉 Hacemos la petición POST
            const response = await fetch('https://playground.4geeks.com/contact/agendas/angel/contacts', {
                method: 'POST', // 👈 Especificamos que es POST
                headers: {
                    'Content-Type': 'application/json', // 👈 Indicamos que enviamos JSON
                },
                // 👉 Convertimos nuestro objeto a string JSON
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    address
                }),
            });

            if (!response.ok) {
                throw new Error('Error al crear el contacto');
            }

            alert('Contacto creado con éxito')

            navigate("/")

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="fullName" className="form-label"> Name</label>
                    <input type="text" className="form-control" id="fullName" aria-describedby="fullName" placeholder="Angel Ramos" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="angel@ramos.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" placeholder="+34 000 00 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Plaza del Sol, Madrid" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Create Contact</button>
            </form>

        </div>
    )
};

export default AddContact 