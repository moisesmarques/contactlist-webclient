import React from 'react';
import { useFormik } from 'formik';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';

export class PeopleForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            step:'List',
            currentPerson: props.person,
            currentContact: null,
            apiBaseUrl: "https://localhost:44324/api/"
        }        
    }
  
  async loadPerson(){    
    const response = await fetch(this.state.apiBaseUrl + 'people/'+ this.state.currentPerson.Id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }      
    });
    
    if(response.ok){
        this.setState({currentPerson: await response.json()});
    }else{
        const error = await response.json();
        alert(error.Message);
    }
    
  }
  
  async deleteContact(contact){
    const response = await fetch(this.state.apiBaseUrl + 'contacts/' + contact.Id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }      
    });

    if(response.ok){
        this.loadPerson();
    }else{
        const error = await response.json();
        alert(error.Message);
    }
  }

  async addContact(contact){

    contact.Person = this.state.currentPerson;

    const response = await fetch(this.state.apiBaseUrl + 'contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });    

    if(response.ok){
        this.loadPerson();
    }else{
        const error = await response.json();
        alert(error.Message);
    }
  }

  async updateContact(contact){
    const response = await fetch(this.state.apiBaseUrl + 'contacts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),      
      
    });

    if(response.ok){
        this.loadPerson();
    }else{
        const error = await response.json();
        alert(error.Message);
    }
  }
  
  showContact(contact){
    this.setState({step: 'Form', currentContact: contact});
  }

 
  render(){    
    
    const stepRSX = this.state.currentPerson.Id > 0 ?
     this.state.step == 'List' ? 
    <ContactList contacts={this.state.currentPerson.Contacts} 
      deleteContact={(contact)=> {        
        this.deleteContact(contact);
      }}
      showContact={(contact) => {
        this.showContact(contact);
      }}
      addContact={() =>{
        this.showContact({Id:null, Name:''});
      }}
      /> :
    <ContactForm contact={this.state.currentContact}
      saveContact={(contact) => {
       if(contact.Id > 0){
          this.updateContact(contact);
        }else{
          this.addContact(contact);
        }
  
        this.setState({step: 'List'});
  
      }}
      goBack={()=>{
        this.setState({step: 'List'});
        this.loadPerson();
      }}
    /> : null;
    
    ;
    

  return (
        <div>
            <PeopleFormFormik person={this.state.currentPerson}
            savePerson={this.props.savePerson}
            goBack={this.props.goBack} />
            <br />            
            {stepRSX}    
        </div>
    );
  }
}

function PeopleFormFormik(props) {

    const validate = values => {
        const errors = {};
        if (!values.Name) {
          errors.Name = 'Contact Name is required';
        } else if (values.Name.length > 20) {
          errors.Name = 'Contact Name must be 20 characters or less';
        }
      
        return errors;
      };

    const formik = useFormik({
        initialValues: {
        Id: props.person.Id,
        Name: props.person.Name,      
        },
        validate,
        onSubmit: values => {
            props.savePerson(values);
        },
    });

    return(
        <form onSubmit={formik.handleSubmit}>
            <input
            id="Id"
            name="Id"
            type="hidden"        
            value={formik.values.Id}
        />      
            <label htmlFor="Name">Contact Name</label>      
            <input
                id="Name"
                name="Name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.Name}
                className="form-control"
            />
            {formik.errors.Name ? <div className="danger">{formik.errors.Name}</div> : null}
            <br />
            <button onClick={() => { props.goBack()}}>Back</button>&nbsp;
            <button type="submit">Save</button>
            </form>
    );
}
