import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Badge } from "@material-ui/core";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";
import { getProductsInCart } from "../../reducks/users/selectors";

const HeaderMenus = (props) => {
  const selector = useSelector((state) => state);
  let productsInCart = getProductsInCart(selector);

  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart?.length} color="secondary">
          <PersonPinIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
