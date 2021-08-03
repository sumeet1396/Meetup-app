import { useRef, useState, useEffect } from 'react';

const validate = (values) => {
    let errors = {};
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!values.title.trim() && "title" in values) {
      errors.title = 'Please add a title';
    }

    if (!values.image && "image" in values) {
      errors.image = 'Image URL required';
    } else if (!/(https?:\/\/.*\.(?:png|jpg))/.test(values.image) && "image" in values) {
      errors.image = 'Image URL is invalid';
    }

    if (!values.address && "address" in values) {
      errors.address = 'Address is required';
    } else if (values.address.length < 6 && "address" in values) {
      errors.address = 'Please add a valid address';
    }

    if (!values.description && "description" in values) {
      errors.description = 'Description is required';
    } else if (values.description.length < 15 && "description" in values) {
      errors.description = 'Description needs to be 6 characters or more';
    }

    if (!values.email && "email" in values) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(values.email) && "email" in values) {
      errors.email = 'Please add a valid Email';
    }

    if (!values.phone && "phone" in values) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(values.phone) && "phone" in values) {
      errors.phone = 'Please add a valid Phone number';
    }

    return errors;
}


const useForm = (callback, formFields) => {
    const [values, setValues] = useState(formFields);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
			const { name, value } = e.target;
			setValues({
				...values,
				[name]: value
			});
    };

    const handleSubmit = e => {
			e.preventDefault();

			setErrors(validate(values));
			setIsSubmitting(true);
    };

    useEffect(() => {
			if (Object.keys(errors).length === 0 && isSubmitting) {
				callback(values);
			}
    }, [errors]);

    return { handleChange, handleSubmit, values, errors };
}

export default useForm;
