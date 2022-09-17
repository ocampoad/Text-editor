import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  

// function to update the text in the text editor 
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDB = await openDB('jate', 1);
  const transaction = jateDB.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const request = store.add({ text: content });
  const result = request;
  console.log("PUT" + result);
};

// function to retreive the text data from the data base
export const getDb = async () => {
  console.log('GET from the database');
  const jateDB = await openDB('jate',1);
  const transaction =  jateDB.transaction('jate', 'readonly');;
  const store =  transaction.objectStore('jate');
  const request =  store.getAll();
  const result =  request;
  console.log("GET" + result);
};

initdb();
