import React from 'react';

export function PeopleList(props) {
  const items = props.people.map((person) => {
    return (<li key={person.id}>{person.name}&nbsp;
        <button onClick={() => {
        props.deletePerson(person);
      }}>Delete</button></li>);
  });
  return (<ul>{items}</ul>);
}
