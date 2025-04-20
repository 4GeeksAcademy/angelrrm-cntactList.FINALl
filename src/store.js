export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    userRoll: "free",
    contacts: [],
    foundContact: {}
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case "add_contact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    case "set_contacts":
      return {
        ...store,
        contacts: action.payload
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };

    case "find_contact":
      // Corregido: action.payload ahora es directamente el ID, no un objeto
      const contactId = action.payload;
      const foundContact = store.contacts.find(contact =>
        contact.id.toString() === contactId.toString()
      ) || {};

      return {
        ...store,
        foundContact: foundContact
      };

    default:
      throw Error('Unknown action.');
  }
}