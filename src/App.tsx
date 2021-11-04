import React, { useState } from "react";
import { useQuery } from "react-query";

import { Wrapper, StyledButton } from "./App.styled";
//Components UI
import {
  Drawer,
  LinearProgress,
  Grid,
  Typography,
  Badge,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import { Item } from "./Item/Item";
import Cart from "./Cart/Cart";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotal = (items: CartItemType[]) => items.reduce((acc: number, item) =>  acc + item.amount, 0);
  
  const handleAddToCart = (slectedItem: CartItemType) => {
    setCartItems(prevItems => {
      // is the item already in the cart?
      const isItemInCart = prevItems.find(item => item.id === slectedItem.id);
      if (isItemInCart) {
        return prevItems.map(item => item.id === slectedItem.id ? { ...item, amount: item.amount + 1 } : item);
      }
      // if not, add it
      return [...prevItems, { ...slectedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error)
    return (
      <Typography>
        Error 404 <br /> Ooops! looks like something went wrong!
      </Typography>
    );

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotal(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Item
              item={item}
              addToCart={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
