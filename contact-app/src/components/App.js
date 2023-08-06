import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 } from 'uuid';
import './App.css';
import api from '../api/contacts';
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm]=useState("");
  const [searchResults,setSearchResults]=useState([]);

const retrieveContacts=async()=>{
  const  response =await api.get("/contacts");
  return response.data;
};

  const addContactHandler =async (contact) => {
    console.log(contact);
    // setContacts([...contacts, { id: v4(), ...contact }]);
    const request={
      id: v4(),
      ...contact,
      state:{
        ...contact,
      }
    };
    const response=await api.post("/contacts",request);
    console.log(response);
    setContacts([...contacts,response.data]);
  };
const updateContactHandler=async(contact)=>{
  console.log("UPDatecdsddsfdasfads",contact.id)
  const response=await api.put(`/contacts/${contact.id}`,contact);
  console.log("Response .data value",response.data)
  const {id,name,email}=response.data;
  setContacts(
    contacts.map((contact)=>{
      return contact.id===id?{...response.data}:contact;
    })
  );
};
  const removeContactHandler = async(id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  const searchHandler=(searchTerm)=>{
    setSearchTerm(searchTerm);
    if(searchTerm!==""){
      const newContactList=contacts.filter((contact)=>{
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());

      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts) setContacts(retrieveContacts);vdfdfbdf
    const getAllContacts=async()=>{
      const allContacts=await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };
    getAllContacts();
  },[]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ContactList contacts={searchTerm.length<1?contacts:searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler}/>} />
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/edit/:id" element={<EditContact updateContactHandler={updateContactHandler} />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
