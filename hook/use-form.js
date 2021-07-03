import { useRef, useState, useEffect } from 'react';

const validate = (values) => {
    let errors = {};
  
    if (!values.title.trim()) {
      errors.title = 'Please add a title';
    }

    if (!values.image) {
      errors.image = 'Image URL required';
    } else if (!/(https?:\/\/.*\.(?:png|jpg))/.test(values.image)) {
      errors.image = 'Image URL is invalid';
    }

    if (!values.address) {
      errors.address = 'Address is required';
    } else if (values.address.length < 6) {
      errors.address = 'Please add a valid address';
    }

    if (!values.description) {
      errors.description = 'Description is required';
    } else if (values.description.length < 15) {
      errors.description = 'Description needs to be 6 characters or more';
    }

    return errors;

}


const useForm = (callback) => {
    const [values, setValues] = useState({
			title: '',
			image: '',
			address: '',
			description: ''
    });

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
