import { Button } from "@material-ui/core";

import { CartItemType } from "../App";

import { Wrapper } from "./Item.styled";

type itemProps = {
  item: CartItemType;
  addToCart: (slectedItem: CartItemType) => void;
};

export const Item: React.FC<itemProps> = ({ item, addToCart }) => {
  const { title, price, image, description } = item;

  return (
    <Wrapper>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>${price}</p>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => addToCart(item)}
      >
        Add to cart
      </Button>
    </Wrapper>
  );
};
