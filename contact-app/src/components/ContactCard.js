import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";

const ContactCard = (props) => {
 
  const {  name, email } = props.contact;
  const {id}=props.newId;
  const newCheck={
    name:name,
    email:email,
    id:props.newId
  };

  console.log("NEW CHEC in cartK",newCheck)
  



  
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        
        <Link to={`/contact/${newCheck.id}`}
         state= {{ contact: newCheck} }>
            
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => props.clickHander(newCheck.id)}
      ></i>
      <Link to={`/edit/${newCheck.id}`}
         state= {{ contact: newCheck} }>
      <i
        className="edit alternate outline icon"
        style={{ color: "blue", marginTop: "7px", marginLeft: "10px" }}
        
      ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
