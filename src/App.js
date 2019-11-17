import React from 'react';
import './App.css';
import { PeopleList } from './PeopleList';

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      peopleList: [
        {id: 1, name: 'John'},
        {id: 2, name: 'Sarah'}
      ]
    };
  }
  
  render(){
    return (
      <div className="App">
        <PeopleList people={this.state.peopleList} deletePerson={(person)=> {        
          console.log(person.name + ' was deleted.');
          this.setState({peopleList: [{id:2, name: 'Sarah'}]});
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
