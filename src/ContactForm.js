import React from 'react';
import { useFormik } from 'formik';


export function ContactForm(props) {
 
    const validate = values => {
        const errors = {};
        if (!values.Value) {
          errors.Value = 'Info is required';
        } else if (values.Value.length > 60) {
          errors.Name = 'Info must be 60 characters or less';
        }
      
        return errors;
      };

 const formik = useFormik({
    initialValues: {
      Id: props.contact.Id,
      Type: props.contact.Type || 1,      
      Value: props.contact.Value,      
    },
    validate,
    onSubmit: values => {
      props.saveContact(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
        <input
        id="Id"
        name="Id"
        type="hidden"        
        value={formik.values.Id}
      />      
        <label htmlFor="Type">Type</label> 
        <select
            id="Type"
            name="Type"
            onChange={formik.handleChange}
            value={formik.values.Type}
            className="form-control">
            <option value="1" label="E-mail" />
            <option value="2" label="Phone" />
            <option value="3" label="Whatsapp" />
            <option value="4" label="Other" />
        </select>             
        <label htmlFor="Value">Info</label>      
        <input
            id="Value"
            name="Value"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.Value}
            className="form-control"
        />
        {formik.errors.Value ? <div className="danger">{formik.errors.Value}</div> : null}
        <br />
        <button onClick={() => { props.goBack()}}>Cancel</button>&nbsp;
        <button type="submit">Ok</button>
    </form>
  );

}
