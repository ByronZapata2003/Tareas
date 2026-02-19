import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export interface Contact {
  name: string;
  phone: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setContacts([
        { name: "Juan Pérez", phone: "3001234567" },
        { name: "María López", phone: "3019876543" }
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const addContact = (contact: Contact): void => {
    setContacts((prev) => [...prev, contact]);
  };

  const deleteContact = (index: number): void => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) return <Loader />;

  return (
    <div style={{ padding: 20 }}>
      <h1>Contact Manager</h1>
      <ContactForm addContact={addContact} />
      <ContactList contacts={contacts} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
