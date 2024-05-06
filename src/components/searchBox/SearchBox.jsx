import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice'; 
import { v4 as uuidv4 } from 'uuid';

import css from './SearchBox.module.css';

const SearchBox = () => {
  const searchId = uuidv4();
  const nameFilter = useSelector(state => state.filters.name); 
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const { value } = e.target;
    dispatch(changeFilter(value));
  };

  return (
    <div className={css['SearchBox']}>
      <label className={css.label} htmlFor={searchId}>
        Find contacts by name
      </label>
      <input
        className={css.input}
        type="text"
        name="text"
        id={searchId}
        placeholder="Search..."
        value={nameFilter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default SearchBox;
