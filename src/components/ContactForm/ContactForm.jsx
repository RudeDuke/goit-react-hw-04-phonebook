import { memo, useState } from 'react';
import {
  Button,
  Form,
  InputWrapper,
  Input,
  InputIcon,
  Label,
} from './ContactForm.styled';
import { FaPhone, FaUser } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ContactForm = ({ onAddContact }) => {
  const [state, setState] = useState({ name: '', number: '' });

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAddContact(state.name, state.number);
    setState({ name: '', number: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <Label>
          <InputIcon>
            <FaUser />
          </InputIcon>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={state.name}
            onChange={handleChange}
            required
          />
        </Label>
      </InputWrapper>
      <InputWrapper>
        <Label>
          <InputIcon>
            <FaPhone />
          </InputIcon>
          <Input
            type="tel"
            name="number"
            placeholder="Number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={state.number}
            onChange={handleChange}
            required
          />
        </Label>
      </InputWrapper>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default memo(ContactForm); // To prevent ContactForm from re-rendering when the filter value changes
