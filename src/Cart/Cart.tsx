import CartItem from "../CartItem/CartItem";

import { Wrapper } from "./Cart.styled";

import { CartItemType } from "../App";

type CartProps = {
    cartItems: CartItemType[];
    addToCart: (slectedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<CartProps> = ({ cartItems, addToCart, removeFromCart }) => {

    const totalPrice = (items: CartItemType[]) =>  items.reduce((acc, item) => acc + item.amount * item.price, 0);

    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {!cartItems ? <p>No items yet!</p> : null}
            {cartItems?.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            { <h2>Total: ${totalPrice(cartItems).toFixed(2)}</h2>}
        </Wrapper>
    );
};

export default Cart;