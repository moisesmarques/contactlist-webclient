import React from 'react';

export function PeopleList(props) {
  const items = props.people.map((person) => {
    return (<li key={person.Id}>{person.Name}&nbsp;
        <button onClick={() => {
        props.deletePerson(person);
      }}>Delete</button></li>);
  });
  return (<ul>{items}</ul>);
}
