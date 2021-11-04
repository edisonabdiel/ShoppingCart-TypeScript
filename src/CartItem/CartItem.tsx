import { Button } from "@material-ui/core";

import { CartItemType } from "../App";

import { Wrapper } from "./CartItem.styled";

type CartItemProps = {
  item: CartItemType;
  addToCart: (selectedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  addToCart,
  removeFromCart,
}) => (
  <Wrapper>
    <div>
    <h3>{item.title}</h3>
    <div className="info">
      <p>Price: ${item.price}</p>
      <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
    </div>
    <div className="buttons">
      <Button
        disableElevation
        size="small"
        variant="contained"
        onClick={() => removeFromCart(item.id)}
      >
        -
      </Button>
      <p>{item.amount}</p>
      <Button
        disableElevation
        size="small"
        variant="contained"
        onClick={() => addToCart(item)}
      >
        +
      </Button>
    </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>
);

export default CartItem;
