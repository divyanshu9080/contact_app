import React,{useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
const ContactList = (props) => {
    console.log("Propsin contct lsit",props);
    const inputEl=useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };
    
    const renderContactList = props.contacts.map((contact) => {
        console.log("NEW CHECK contact list",contact)
        return <ContactCard newId={contact.id} contact={contact.state} clickHander={deleteContactHandler} key={contact.id} />;

    });
    const getSearchTerm=()=>{
        props.searchKeyword(inputEl.current.value);
    };
    return (
        <div className="ui fixed menu">
            <div className="ui container center">
        <div className="main">
            
            <h2>Contact List
                <Link to ="/add">
                <button className="ui right floated blue button">Add Contact</button>
                
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchTerm}/>
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">{renderContactList.length>0?renderContactList:"No Contacts Available"}</div>
        </div>
        </div>
        </div>

        
    );
};
export default ContactList;