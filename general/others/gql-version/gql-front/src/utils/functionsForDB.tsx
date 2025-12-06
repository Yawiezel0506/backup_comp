import { useAppDispatch } from "../rtk/hooks";
import axios from "axios";
import { useEffect } from "react";
import { setProducts } from "../rtk/productsSlice";
import { setBanners, setCategory } from "../rtk/category&banners";
import { useQuery, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


const baseUrl = import.meta.env.VITE_SERVER_API || "https://store-back-3.onrender.com"

export function ConnectToData() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/products`
        );
        if(response.data){
          const { data } = response;
          dispatch(setProducts(data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}


export const ConnectBanners = async () => {
  const dispatch = useAppDispatch();

  try {
    const resp = await axios.get(`https://serverbanners.onrender.com/banners`);
    if (resp.data) {
      const { data } = resp;
      dispatch(setBanners(data));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const GET_CATEGORY = gql`
  query {
    getCategory {
      name
      image
      click
    }
  }
`;


const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


export function ConnectCategory() {
  const dispatch = useAppDispatch();
  const { error, data } = useQuery(GET_CATEGORY);

  useEffect(() => {
    if (data) dispatch(setCategory(data.getCategory))
    if (error) throw error
  }, [data, dispatch, error])
}


