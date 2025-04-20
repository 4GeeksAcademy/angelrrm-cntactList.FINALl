import React from 'react'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {useNavigate} from 'react-router-dom'


function ContactCard(props) {

  const { dispatch } = useGlobalReducer()
  const navigate = useNavigate()


  const handleDelete = async () => {
    // Primero pedimos confirmación al usuario
    // Es importante siempre confirmar antes de borrar algo
    if (!window.confirm('¿Estás seguro de que quieres borrar este contacto?')) {
      return;
    }

    try {
      // 👉 Hacemos la petición DELETE
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/angel/contacts/${props.contactId}`,
        {
          method: 'DELETE', // 👈 Especificamos que es DELETE
        }
      );

      if (!response.ok) throw new Error('Error al borrar el post');

      alert('Contacto borrado con éxito')

      dispatch({
        type: "delete_contact",
        payload: props.contactId
      })

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <div className="card " style={{ "width": "25rem" }}>
        <div className="card-header">
          {props.contactName}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Email: {props.contactEmail}</li>
          <li className="list-group-item">Phone: {props.contactPhone}</li>
          <li className="list-group-item">Address: {props.contactAddress}</li>
          <li type="button" className="list-group-item bg-warning" onClick={() => { navigate(`/edit/${props.contactId}`)}}>Edit Contact</li>
          <li type="button" className="list-group-item bg-danger text-white" onClick={handleDelete}>Delete</li>
        </ul>
      </div>
    </div>
  )
}

export default ContactCard