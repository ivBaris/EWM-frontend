import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ownStyles from "../../util/Styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const CategorySelector = (props) => {
  const classes = ownStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, value) => {
    props.setCategory(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl variant="outlined" className={classes.CategorySelector}>
      <InputLabel id="category-label">Kategorie</InputLabel>
      <Select
        labelId="category-label"
        id="category-label"
        value={props.category}
        onChange={handleChange}
        label="Kategorie"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        <MenuItem value="">
          <em>...</em>
        </MenuItem>
        <MenuItem value={"Essen & Trinken"}>Essen und Trinken</MenuItem>
        <MenuItem value={"Grillen"}>Grillen</MenuItem>
        <MenuItem value={"Geburtstag"}>Geburtstag</MenuItem>
        <MenuItem value={"Party"}>Party</MenuItem>
        <MenuItem value={"Lernen"}>Lernen</MenuItem>
        <MenuItem value={"Urlaub"}>Urlaub</MenuItem>
        <MenuItem value={"Sport"}>Sport</MenuItem>
        <MenuItem value={"Spieleabend"}>Spieleabend</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategorySelector;
