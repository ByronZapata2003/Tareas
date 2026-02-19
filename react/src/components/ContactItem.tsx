import type { Contact } from "../App";

interface Props {
  contact: Contact;
  deleteContact: () => void;
}

function ContactItem({ contact, deleteContact }: Props) {
  return (
    <div style={{ margin: "10px 0" }}>
      <strong>{contact.name}</strong> - {contact.phone}

      <button onClick={deleteContact} style={{ marginLeft: 10 }}>
        Delete
      </button>
    </div>
  );
}

export default ContactItem;