import type { Contact } from "../App";
import ContactItem from "./ContactItem";

interface Props {
  contacts: Contact[];
  deleteContact: (index: number) => void;
}

function ContactList({ contacts, deleteContact }: Props) {
  return (
    <div>
      <h2>Contacts</h2>

      {contacts.map((contact, index) => (
        <ContactItem
          key={index}
          contact={contact}
          deleteContact={() => deleteContact(index)}
        />
      ))}
    </div>
  );
}

export default ContactList;
