import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  formContorl: {
    marginBottom: 16,
    minWidth: 128,
    width: "100%",
  },
});

const SelectBox = (props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formContorl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={props.required}
        onChange={(event) => props.select(event.target.value)}
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;

// onChange={(event) => props.select(event.target.value)}
// -> selectで選択された値が変わったら、その値を元にpropsで渡されきたselectという関数を実行する
