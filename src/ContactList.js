import React from 'react';

export function ContactList(props) {
  const items = props.contacts.map((contact) => {
    return (<tr key={contact.Id}>              
              <td><ContactType type={contact.Type} /></td>
              <td>{contact.Value}</td>
              <td><button onClick={() => {
                    props.showContact(contact);
                  }}>Edit</button></td>
              <td><button onClick={() => {
                    props.deleteContact(contact);
                  }}>Delete</button></td>
              </tr>
            );
  });
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Type</th>
          <th>Info</th>
          <th></th>
          <th>
            <button onClick={() => {
                    props.addContact();
                  }}>Add New</button>
          </th>
        </tr>
      </thead>
      <tbody>{items}</tbody>
    </table>
  );
}

function ContactType(props){
    let typeStr = '';

    if(props.type == 2)
        typeStr = 'Phone';
    else if(props.type == 3)
        typeStr = 'Whatsapp';
    else if(props.type == 4)
        typeStr  = 'Other';
    else
        typeStr = 'E-mail';

    return(
        typeStr
    );
}