import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PeopleList } from './PeopleList';
import { PeopleForm } from './PeopleForm';
import { throwStatement } from '@babel/types';

export class App extends React.Component {

  constructor(props){
    super(props);    
    this.apiBaseUrl = "https://localhost:44324/api/";
    this.state = {
      title: 'Contact List',
      peopleList: [],
      step: 'List',
      currentPerson: null
    };
    this.loadPeople();
  }

  async loadPeople(){    
    const response = await fetch(this.apiBaseUrl + 'people', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }      
    });

    if(response.ok){
      this.setState({peopleList: await response.json()});
    }else{
        const error = await response.json();
        alert(error.Message);
    }
    
  }
  
  async deletePerson(person){
    const response = await fetch(this.apiBaseUrl + 'people/' + person.Id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }      
    });

    if(response.ok){
      this.loadPeople();
    }else{
        const error = await response.json();
        alert(error.Message);
    }    
  }

  async addPerson(person){
    const response = await fetch(this.apiBaseUrl + 'people', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person),
    });

    if(response.ok){
      this.loadPeople();
    }else{
        const error = await response.json();
        alert(error.Message);
    }
  }

  async updatePerson(person){
    const response = await fetch(this.apiBaseUrl + 'people', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person),
    });
    
    if(response.ok){
      this.loadPeople();
    }else{
        const error = await response.json();
        alert(error.Message);
    }
  }
  
  showPerson(person){
    this.setState({step: 'Form', currentPerson: person, title: person.Id > 0 ? person.Name : 'New Contact'});
  }

  render(){
    const stepRSX = this.state.step == 'List' ? 
      <PeopleList people={this.state.peopleList} 
        deletePerson={(person)=> {        
          this.deletePerson(person);
        }}
        showPerson={(person) => {
          this.showPerson(person);
        }}
        addPerson={() =>{
          this.showPerson({Id:null, Name:'', Contacts: []});
        }}
        /> :
      <PeopleForm person={this.state.currentPerson}
        savePerson={(person) => {
         if(person.Id > 0){
            this.updatePerson(person);
          }else{
            this.addPerson(person);
          }
          alert('Contact saved successfully.')
        }}
        goBack={()=>{
          this.setState({step: 'List', title: 'Contact List'});
          this.loadPeople();
        }}
        
      />;

    return (
      <div className="App">        
        <h2>{this.state.title}</h2>
        <br/>
        {stepRSX}
      </div>
    );
  }  
}
