import useForm from '../../hook/use-form';
import Card from '../Ui/Card';
import classes from './Meetup.module.css';

const formFields = {
  title: '',
  image: '',
  address: '',
  description: ''
}

const NewMeetupForm = (props) => {
  const { handleChange, handleSubmit, values, errors } = useForm( props.onAddMeetup, formFields );

  return (
    <Card>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title*</label>
          <input
            type='text'
            id='title'
            name='title'
            value={values.title}
            onChange={handleChange}
          />
          {errors.title && <p className={classes.error}>{errors.title}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image*</label>
          <input
            type='text'
            id='image'
            name='image'
            value={values.image}
            onChange={handleChange}
          />
          {errors.image && <p className={classes.error}>{errors.image}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address*</label>
          <input
            type='text'
            id='address'
            name='address'
            value={values.address}
            onChange={handleChange}
          />
          {errors.address && <p className={classes.error}>{errors.address}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description*</label>
          <textarea
            id='description'
            name='description'
            rows='5'
            value={values.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <p className={classes.error}>{errors.description}</p>}
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
