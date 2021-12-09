const contactOperations = require('./contacts');

const argv = require('yargs').argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactOperations.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await contactOperations.getContactById(id);
      console.table(contact);
      break;

    case 'add':
      await contactOperations.addContact(name, email, phone);
      const newContacts = await contactOperations.listContacts();
      console.table(newContacts);
      break;

    case 'remove':
      await contactOperations.removeContact(id);
      const updateContacts = await contactOperations.listContacts();
      console.table(updateContacts);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};
invokeAction(argv);
