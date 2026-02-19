import { useState } from "react";
import type { Contact } from "../App";

interface Props {
  addContact: (contact: Contact) => void;
}

function ContactForm({ addContact }: Props) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!name || !phone) return;

    addContact({ name, phone });

    setName("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default ContactForm;
