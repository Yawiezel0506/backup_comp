import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { addProductToCart, increment } from "../rtk/cartSlice";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ProductInServerCart } from "../interfaces/product";

const ProductDetails: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [like, setLike] = useState<boolean>(false);
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const product = useAppSelector((state) => state.products.products).find(
    (product) => product.id === Number(id)
  );
  const flag = useAppSelector((state) => state.userName.flag)
  const user_id = useAppSelector((state) => state.userName.userId)

  const ADD_TO_CART = gql`
    mutation AddToCart($input: AddToCartInput) {
      addToCart(input: $input) {
        userId
        products {
          productId
          quantity
          description
          price
        }
      }
    }
  `;

  const GET_PRODUCTS_FROM_CART = gql`
    query Cart($cartId: String!) {
      cart(id: $cartId) {
        products {
          productId
          quantity
          price
          description
        }
      } 
    }
  `;

  const UPDATE_QUANTITY = gql`
    mutation UpdateQuantity($input: UpdateQuantityInput) {
      updateQuantity(input: $input) {
        products {
          quantity
          productId
          description
          price
        }
      }
    }
  `;

  const { error: errorCart, data: dataCart, refetch } = useQuery(GET_PRODUCTS_FROM_CART, {
    variables: { cartId: user_id.toString() },
  });

  useEffect(() => {
    if (dataCart) ////setProductForCart(conversion(dataCart.cart.products))
      if (errorCart) console.error(errorCart);
  }, [dataCart, errorCart])

  const [updateQuantity] = useMutation(UPDATE_QUANTITY)

  const [addToCartInDB] = useMutation(ADD_TO_CART)

  const { title, image, price, attributes, description } = product
    ? product
    : { title: "", image: "", price: 0, attributes: {}, description: "" };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const addToCart = (id: number, price: number, description: string) => {
    if (flag) {
      addToCartInDB({
        variables: {
          input: {
            userId: user_id.toString(), products: [{
              productId: id.toString(),
              price: price,
              quantity: 1,
              description: description
            }]
          }
        }
      }).then(({ data }) => {
        if (data) ///setProductForCart(conversion(dataCart.cart.products));
          refetch()
      })
        .catch((error) => {
          console.error(error);
        });
    } else {
      dispatch(
        addProductToCart({
          name: id,
          quantity: 1,
          price: price,
          description: description,
        })
      );
    }
  };

  const incrementQuantity = (id: number) => {
    if (flag) {
      updateQuantity({
        variables: {
          input: {
            userId: user_id.toString(),
            productId: id.toString(),
            quantity: 1,
          },
        },
      })
        .then(({ data }) => {
          if (data) ///setProductForCart(conversion(dataCart.cart.products));
            refetch()
        })
        .catch((error) => {
          console.error(error);
        });
    }
    else dispatch(increment(id));
  };

  const productInCart = useAppSelector((state) => state.cart.products);

  // const addedToCart =
  //   Array.isArray(productInCart) &&
  //   productInCart.some((item) => item.name === Number(id));

  const itemInCart = Array.isArray(productInCart) && productInCart.find((item) => item.name === Number(id));
  const itemInServer = Array.isArray(dataCart?.cart.products) && dataCart?.cart.products.find((item: ProductInServerCart) => item.productId == Number(id));
  const addedToCart = itemInCart || itemInServer ? true : false;

  return (
    <Card style={{ backgroundColor: "cornsilk" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8} md={4}>
            <img
              src={image}
              alt={title}
              style={{ width: "100%", height: "auto" }}
            />
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <IconButton
                  sx={
                    like
                      ? { backgroundColor: "green", color: "black" }
                      : { backgroundColor: "red", color: "white" }
                  }
                  onClick={() => setLike(!like)}
                >
                  <FavoriteIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                  }}

                >
                  {!addedToCart && <AddShoppingCartIcon onClick={() => addToCart(Number(id), price, description)} />}
                  {addedToCart && <PlusOneIcon onClick={() => incrementQuantity(Number(id))} />}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ flexGrow: "1" }} />

          <Grid item xs={12} md={8} container direction="column">
            <Typography variant="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Price: ${price}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Attributes:
            </Typography>
            <ul>
              {Array.isArray(attributes) &&
                attributes.map((attr, index) => (
                  <li key={index}>
                    {attr.key}: {attr.value}
                  </li>
                ))}
            </ul>
            <Accordion
              expanded={expanded}
              onChange={handleExpand}
              sx={{ width: "25vw", backgroundColor: "cornsilk" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ maxWidth: "fit content" }}
              >
                <Typography variant="subtitle1" sx={{ width: "50%" }}>
                  Description
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{ width: "fit content", overflowWrap: "break-word" }}
              >
                <Typography variant="body1">{description}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
