import { useState, useEffect, useRef, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { ContactList, ContactForm, Filter } from 'components';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isRenderFirst = useRef(true);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    if (isRenderFirst.current) {
      isRenderFirst.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`Contact with name ${name} already exists!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  // Used here useMemo just as an use case.
  // Using useMemo in this case doesn't improme the performance significantly due to the relatively small size of the collection.

  const filteredContacts = useMemo(() => {
    const filterRegex = new RegExp(`^${filter}`, 'i');
    return contacts.filter(
      contact =>
        filterRegex.test(contact.name) ||
        filterRegex.test(contact.name.split(' ')[1])
    );
  }, [contacts, filter]);

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <div className="section-wrapper">
        <div className="phonebook-wrapper">
          <h2>Add new contact</h2>
          <ContactForm onAddContact={handleAddContact} />
        </div>
        <div className="contacts-wrapper">
          <h2>My contacts</h2>
          <Filter filter={filter} onFilterChange={setFilter} />
          {filter && filteredContacts.length === 0 && (
            <p className="notif">NOTHING IS FOUND</p>
          )}
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
