import "./home.css";
import { useEffect, useState } from "react";
import { Category } from "../interfaces/category";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { render } from "../rtk/cartSlice";
import { useNavigate } from "react-router-dom";
import HomeSkeleton from "../components/HomeSkeleton";
import { cardCategory, pHello } from "../style/home";
import {
  bannerCard,
  class_scrolling_container,
  hide_scrollbar,
} from "../style/banners";
import { setCategory } from "../rtk/category&banners";
import { gql, useQuery } from "@apollo/client";
import { setProducts } from "../rtk/productsSlice";
import { Banner } from "../interfaces/banner";

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categoriesFromRTK: Category[] = useAppSelector(
    (state) => state.categoryAndBanners.category
  );
  const banners: Banner[] = useAppSelector(
    (state) => state.categoryAndBanners.banners
  );

  const GET_CATEGORIES = gql`
    query ExampleQuery {
      getCategories {
        name
        clicks
        image
      }
    }
  `;

  const { error: errorCategories, data: dataCategories } =
    useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (dataCategories) dispatch(setCategory(dataCategories.getCategories));
    if (errorCategories) throw errorCategories;
  }, [dataCategories, dispatch, errorCategories]);

  const GET_ALL_PRODUCTS = gql`
    query GetAllProducts {
      getAllProducts {
        title
        quantity
        price
        id
        description
        clickCount
        category
        image
        attributes {
          key
          value
        }
      }
    }
  `;

  const { error: errorProducts, data: dataProducts } =
    useQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    if (dataProducts) dispatch(setProducts(dataProducts.getAllProducts));
    if (errorProducts) throw errorProducts;
  }, [dataProducts, dispatch, errorProducts]);

  useEffect(() => {
    if (categoriesFromRTK && categoriesFromRTK.length) {
      setCategories(categoriesFromRTK);
      setLoading(false);
    }
  }, [categoriesFromRTK]);

  useEffect(() => {
    dispatch(render());
  }, [dispatch]);

  const clickToCard = (cat: string) => {
    navigate(`/products/${cat}`);
  };

  const handleClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const userName = useAppSelector((state) => state.userName.userName);
  return (
    <>
      {userName && (
        <Typography variant="h1" align="center" gutterBottom style={pHello}>
          Hello {userName}
        </Typography>
      )}
      {banners?.length > 0 && (
        <>
          <div className="hide-scrollbar" style={hide_scrollbar}>
            <div
              className="scrolling-container"
              style={class_scrolling_container}
            >
              {banners.map((banner, index) => (
                <div key={index} style={bannerCard}>
                  <img
                    className="banner-image"
                    src={banner.image.url}
                    alt={banner.image.alt}
                    onClick={() => handleClick(banner.productID.toString())}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Grid container spacing={2} key={Date.now() * Math.random()}>
        {loading ? (
          <HomeSkeleton />
        ) : (
          Array.isArray(categories) &&
          categories.map((cat: Category) => (
            <Grid item xs={12} sm={6} md={4} key={Date.now() * Math.random()}>
              <Card sx={cardCategory}>
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h2"
                      component="h3"
                      fontFamily="Fira Sans, sans-serif"
                      fontWeight="bold"
                      color="rgb(33,47,58)"
                    >
                      {cat.name}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ maxHeight: 210, objectFit: "" }}
                    image={cat.image}
                    alt={cat.name}
                    onClick={() => clickToCard(cat.name)}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Home;
