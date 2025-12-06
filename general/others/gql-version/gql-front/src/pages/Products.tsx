import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack,
  useTheme,
  Box,
  Slider,
  CardActionArea,
} from "@mui/material";
import {
  decrement,
  increment,
} from "../rtk/cartSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState, useReducer } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate, useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { filterProducts } from "../utils/function";
import { addProductToCart, render } from "../rtk/cartSlice";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { getUniqueAttributes } from "../utils/function";
import AddIcon from "@mui/icons-material/Add";
import ProductSkeleton from "../components/ProductSkeleton";
import { Product, Prices, ProductInServerCart } from "../interfaces/product";
import { connectToData } from "../utils/function";
import {
  buttonAddToCart,
  cardStyle,
  quantityOnCard,
  stackBottom,
  typographyH2Style,
  typographyH3PriceStyle,
  typographyH3Style,
} from "../style/products";
import { gql, useMutation, useQuery } from "@apollo/client";

type State = Record<string, boolean>;
type Action = { type: "toggle"; name: string | number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggle":
      return { ...state, [action.name]: !state[action.name] };
    default:
      throw new Error();
  }
}

const Products = () => {
  const [products, setProducts] = useState<Product[] | null>();
  const [filteredProducts, setFilteredProducts] = useState<
    Product[] | null | undefined
  >(null);
  const [attributes, setAttributes] = useState<
    Record<string, (string | number)[]>
  >({});
  const [value, setValue] = useState<number | null>(null);
  const [activeFilters, setActiveFilters] = useState<{
    [name: string]: string | number;
  }>({});
  const [loading, setLoading] = useState(true);
  const [state, localDispatch] = useReducer(reducer, {});
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { palette } = useTheme();

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

  const { error: errorCart, data: dataCart, refetch } = useQuery(GET_PRODUCTS_FROM_CART, {
    variables: { cartId: user_id.toString() },
  });

  useEffect(() => {
    if (dataCart) ////setProductForCart(conversion(dataCart.cart.products))
      if (errorCart) console.error(errorCart);
  }, [dataCart, errorCart])


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

  const [addToCartInDB] = useMutation(ADD_TO_CART)
  const [updateQuantity] = useMutation(UPDATE_QUANTITY)

  useEffect(() => {
    connectToData(category, setLoading, setProducts);
  }, [category]);

  useEffect(() => {
    if (products) {
      setAttributes(getUniqueAttributes(products));
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    dispatch(render());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const { minPrice, maxPrice }: Prices = products?.reduce(
    (acc, product) => ({
      minPrice: Math.min(acc.minPrice, product.price),
      maxPrice: Math.max(acc.maxPrice, product.price),
    }),
    { minPrice: Infinity, maxPrice: -Infinity }
  ) ?? { minPrice: 0, maxPrice: 0 };

  console.log(setActiveFilters);

  const handleAttributeToggle = (name: string, value: string | number) => {
    if (products) {
      const newFilteredProducts = filterProducts(
        name,
        value,
        products,
        activeFilters,
        setValue
      );
      setFilteredProducts(newFilteredProducts);
    }
  };

  const addToCart = (product: Product) => {
    if (flag) {
      addToCartInDB({
        variables: {
          input: {
            userId: user_id.toString(), products: [{
              productId: product.id.toString(),
              price: product.price,
              quantity: 1,
              description: product.description
            }]
          }
        }
      })
        .then(({ data }) => {
          if (data) ///setProductForCart(conversion(dataCart.cart.products));
            refetch()
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      dispatch(
        addProductToCart({
          name: product.id,
          quantity: 1,
          price: product.price,
          description: product.description,
        })
      );
    };
  }

  const incrementQuantity = (product: Product) => {
    if (flag) {
      updateQuantity({
        variables: {
          input: {
            userId: user_id.toString(),
            productId: product.id.toString(),
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
    else dispatch(increment(product.id));
  };

  const decrementQuantity = (product: Product) => {
    if (flag) {
      updateQuantity({
        variables: {
          input: {
            userId: user_id.toString(),
            productId: product.id.toString(),
            quantity: -1,
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
    else dispatch(decrement(product.id));
  };

  const productInCart = useAppSelector((state: { cart: { products: unknown }; }) => state.cart.products);
  const prices = [
    {
      value: minPrice,
      label: minPrice,
    },
    {
      value: maxPrice,
      label: maxPrice,
    },
    {
      value: (minPrice + maxPrice) / 2,
      label: Math.ceil((minPrice + maxPrice) / 2),
    },
  ];
  refetch()
  return (
    <Stack spacing={2} direction="row">
      <Box width={"15em"}>
        <Box sx={{ width: "15em" }}>
          <Slider
            aria-label="Default"
            value={value ? value : maxPrice}
            min={minPrice}
            max={maxPrice}
            onChange={(_e, value) =>
              handleAttributeToggle("price", value as number)
            }
            aria-labelledby="dynamic-range-slider"
            marks={prices}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box
          key={Date.now()}
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          {Object.entries(attributes).map(([key, value]) => (
            <Grid item key={Date.now() * Math.random()}>
              <Typography variant="subtitle1">{key}</Typography>
              {value.map((item) => (
                <FormGroup key={item}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state[`${item} ${key}`] || false}
                        onChange={() => {
                          localDispatch({
                            type: "toggle",
                            name: `${item} ${key}`,
                          });
                          handleAttributeToggle(key, item);
                        }}
                      />
                    }
                    label={item}
                  />
                </FormGroup>
              ))}
            </Grid>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", height: "" }}>
        {loading ? (
          <ProductSkeleton />
        ) : (
          filteredProducts?.map((product) => {
            const itemInCart = Array.isArray(productInCart) && productInCart.find((item) => item.name === product.id);
            const itemInServer = Array.isArray(dataCart?.cart.products) && dataCart?.cart.products.find((item: ProductInServerCart) => item.productId == product.id);
            const addedToCart = flag ? (itemInServer ? true : false) : (itemInCart ? true : false);
            return (
              <Grid key={product.id}>
                <Card sx={cardStyle}>
                  <CardActionArea
                    onClick={() => handleClick(product.id.toString())}
                  >
                    <CardMedia
                      component="img"
                      height="180em"
                      sx={{ position: "" }}
                      image={product.image}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography variant="h2" sx={typographyH2Style}>
                        {product.category}
                      </Typography>
                      <Typography
                        variant="h3"
                        color={palette.grey[800]}
                        sx={typographyH3Style}
                      >
                        {product.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Stack direction="row" alignItems="center" sx={stackBottom}>
                    <Typography variant="h3" sx={typographyH3PriceStyle}>
                      ${product.price}
                    </Typography>
                    {!addedToCart && <IconButton onClick={() => addToCart(product)} sx={buttonAddToCart} > <AddShoppingCartIcon sx={buttonAddToCart} /></IconButton>}
                    {addedToCart &&
                      <Box>
                        <IconButton sx={buttonAddToCart} onClick={() => incrementQuantity(product)}>
                          <AddIcon />
                        </IconButton>
                        <IconButton sx={quantityOnCard}>{itemInCart ? itemInCart.quantity : itemInServer.quantity}</IconButton>
                        <IconButton sx={buttonAddToCart} onClick={() => decrementQuantity(product)}>
                          <RemoveIcon />
                        </IconButton>
                      </Box>}
                  </Stack>
                </Card>
              </Grid>
            );
          })
        )}
      </Box>
    </Stack >
  );
};
export default Products;
