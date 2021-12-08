const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  if (!contacts) {
    return console.log('Не удалось найти контакты');
  }
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  if (!result) {
    return console.log('Такой ID не найден');
  }
  return result;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(item => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  console.log('Контакт удален');
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log('Контакт добавлен');
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
