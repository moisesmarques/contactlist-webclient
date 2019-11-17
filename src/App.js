import React from 'react';
import './App.css';
import { PeopleList } from './PeopleList';

export class App extends React.Component {

  constructor(props){
    super(props);    
    this.apiBaseUrl = "https://localhost:44324/api/";
    this.state = {
      peopleList: []
    };
    this.loadPeople();
  }

  loadPeople(){
    fetch(this.apiBaseUrl + "people")
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({peopleList: result});
        },        
        (error) => {
          console.log(error);
        }
    );
  } 
  
  render(){
    return (
      <div className="App">
        <PeopleList people={this.state.peopleList} deletePerson={(person)=> {        
          console.log(person.Name + ' was deleted.');
          this.setState({peopleList: [{Id:2, Name: 'Sarah'}]});
        }}/>

        {/* <nav>
        <a href="/html/">HTML</a> |
        <a href="/css/">CSS</a> |
        <a href="/js/">JavaScript</a> |
        <a href="/jquery/">jQuery</a>
        </nav>        */}
        
      </div>
    );
  }  
}
