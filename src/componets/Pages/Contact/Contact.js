import React, { useState } from 'react';

//tarberak 2
const defaultValues = {
    name: '',
    email: '',
    phone: '',
    message: ''
}

function Contact() {

    //tarberak 1
    // const [values, setValues] = useState({
    //     name: '',
    //     email: '',
    //     phone: '',
    //     message: ''
    // });

    //tarberak 2
    const [values, setValues] = useState(defaultValues);

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const send = () => {
        console.log(values);

        //tarbeak 1
        // setValues({
        //     name: '',
        //     email: '',
        //     phone: '',
        //     message: ''
        // })

        //tarberak 2
        setValues(defaultValues)
    }

    return (
        <div>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
            />
            <input
                type="phone"
                name="phone"
                placeholder="Phone"
                value={values.phone}
                onChange={handleChange}
            />
            <textarea
                name="message"
                placeholder="Message"
                value={values.message}
                onChange={handleChange}
            >
            </textarea>
            <button
                onClick={send}
            >Send</button>
        </div>
    )
}

export default Contact