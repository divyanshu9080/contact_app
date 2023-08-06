import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditContact = (props) => {
  const location=useLocation();
// const { name, email } = location.state.contact;
console.log("LOCation value from useLcoation",location);


  const [state, setState] = useState({
    name: "",
    email: "",
  });

    

useEffect(()=>{
if(location.state.contact){
setState({name:location.state.contact.name,email:location.state.contact.email})
}
},[])
 

  const navigate = useNavigate();

  const update = (e) => {
    e.preventDefault();
    if (state.name === "" || state.email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    console.log("Finally updated",state)
    let finalState={...location.state.contact,state}
     props.updateContactHandler(finalState);
    setState({ name: "", email: "" });
    navigate("/");
  };
  

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
}

export default EditContact;
