import React from 'react';

export function PeopleList(props) {
  const items = props.people.map((person) => {
    return (<tr key={person.Id}>
              <td>{person.Id}</td>
              <td>{person.Name}</td>
              <td><button onClick={() => {
                    props.showPerson(person);
                  }}>Show</button></td>
              <td><button onClick={() => {
                    props.deletePerson(person);
                  }}>Delete</button></td>
              </tr>
            );
  });
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th></th>
          <th>
            <button onClick={() => {
                    props.addPerson();
                  }}>Add New</button>
          </th>
        </tr>
      </thead>
      <tbody>{items}</tbody>
    </table>
  );
}
