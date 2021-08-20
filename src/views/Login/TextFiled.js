import React from 'react'
import {useField, ErrorMessage} from 'formik';

function TextFiled({label, ...props}) {
    const [fields, meta] = useField(props);
    return (
        <div style={{width: '100%'}}>
            <label htmlFor={fields.name} className="LabelConnection" >{label}&nbsp;</label>
            <input
                {...fields} {...props}
                autoComplete="off"
            ></input>
            <div className="DAD-Error">
                <ErrorMessage  name={fields.name}/>
            </div>
        </div>
    )
}

export default TextFiled
