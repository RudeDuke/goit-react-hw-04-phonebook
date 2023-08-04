import { memo } from 'react';
import {
  FilterContainer,
  InputIcon,
  FilterInput,
  FilterLabel,
  InputWrapper,
} from './Filter.styled';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Filter = ({ filter, onFilterChange }) => (
  <FilterContainer>
    <InputWrapper>
      <FilterLabel>
        <InputIcon>
          <FaSearch />
        </InputIcon>
        <FilterInput
        type="text"
        placeholder='Search'
          value={filter}
          onChange={event => onFilterChange(event.target.value)}
        />
      </FilterLabel>
    </InputWrapper>
  </FilterContainer>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default memo(Filter); // To prevent the Filter from re-rendering when the ContactList changes
