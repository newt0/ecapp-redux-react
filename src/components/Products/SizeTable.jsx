import React from "react";
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

const SizeTable = (props) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {props.sizes.length > 0 &&
            props.sizes.map((item, index) => (
              <TableRow key={item.size}>
                <TableCell component="th" scope="row">
                  {item.size}
                </TableCell>
                <TableCell>残り{item.quantity}点</TableCell>
                <TableCell className={classes.iconCell}>
                  {item.quantity > 0 ? (
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => props.addProduct(item.size)}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <div>SOLD OUT</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton className={classes.iconCell}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
