import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../../Css/Dropdown.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Dropdown = (props) => {
  const [region, setRegion] = useState('');
  const classes = useStyles();

  const handleChange = (e) => {
    setRegion(e.target.value);
    props.onFilterRegion(e.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">
          Select By Region
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={region}
          onChange={handleChange}
        >
          <MenuItem value={10}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Africa'}>Africa</MenuItem>
          <MenuItem value={'Asia'}>Asia</MenuItem>
          <MenuItem value={'Europe'}>Europe</MenuItem>
          <MenuItem value={'America'}>America</MenuItem>
          <MenuItem value={'Oceania'}>Oceania</MenuItem>
          <MenuItem value={'Americas'}>Americas</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
