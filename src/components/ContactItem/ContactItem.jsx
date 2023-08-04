import {memo} from 'react';
import PropTypes from 'prop-types';
import { Button, Item, Name, Number } from './ContactItem.styled';

const ContactItem = ({ id, name, number, onDeleteContact }) => (
  <Item>
    <Name>{name}</Name>
    <Number>{number}</Number>
    <Button onClick={() => onDeleteContact(id)}>Delete</Button>
  </Item>
);

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default memo(ContactItem); // To prevent ContactList from re-rendering each NEW / LEFT ContactItem when ContactList is changed.
