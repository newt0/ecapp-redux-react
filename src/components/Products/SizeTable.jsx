import React from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
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

  const sizes = props.sizes;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0
            ? sizes.map((size) => (
                <TableRow key={size.size}>
                  <TableCell component="th" scope="row">
                    {size.size}
                  </TableCell>
                  <TableCell className={classes.iconCell}>
                    残り{size.quantity}点
                  </TableCell>
                  <TableCell className={classes.iconCell}>
                    {size.quantity > 0 ? (
                      <IconButton onClick={() => props.addProduct(size.size)}>
                        <ShoppingCartIcon />
                      </IconButton>
                    ) : (
                      <div>Sold Out</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <FavoriteBorderIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
