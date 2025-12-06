import axios from "axios";
import { Product } from "../interfaces/product";
import { SendOrderDetails } from "../interfaces/payment";

export function filterProducts(
  name: string,
  value: string | number,
  products: Product[],
  activeFilters: { [name: string]: string | number },
  setValue: React.Dispatch<React.SetStateAction<number | null>>
) {
  setValue(value ? +value : null);
  let filterByPrice = products;
  if (name === "price") {
    filterByPrice = products?.filter((product) => {
      return product.price <= +value;
    });
  }
  if (name !== "price") {
    const filterKey = `${name}_${value}`;
    if (activeFilters[filterKey]) {
      delete activeFilters[filterKey];
    } else {
      activeFilters[filterKey] = filterKey;
    }
  }
  const newFilteredProducts = filterByPrice?.filter((product) => {
    return Object.keys(activeFilters).every((filter) => {
      const [filterName, filterValue] = filter.split("_");
      return product.attributes.some((attribute) => {
        return attribute.key === filterName && attribute.value === filterValue;
      });
    });
  });
  return newFilteredProducts ?? null;
}

export function getUniqueAttributes(
  products: Product[]
): Record<string, (string | number)[]> {
  const groupedAttributes: Record<string, (string | number)[]> = {};
  products?.forEach((product) => {
    product.attributes.forEach((attribute) => {
      const { key, value } = attribute;
      if (!groupedAttributes[key]) {
        groupedAttributes[key] = [];
      }
      if (!groupedAttributes[key].includes(value)) {
        groupedAttributes[key].push(value);
      }
    });
  });
  return groupedAttributes;
}

const baseURL = import.meta.env.VITE_SERVER_API_OLD;

export function connectToData(
  category: string | undefined,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setProducts: React.Dispatch<
    React.SetStateAction<Product[] | null | undefined>
  >
) {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/products?category=${category}`
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}

export function sendOrderDetails(order: SendOrderDetails) {
  const fetchOrder = async () => {
    try {
      const response = await axios.post(`${baseURL}/graphql/orders`, order);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchOrder();
}

export function getAllOrders(id: string) {
  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${baseURL}/orders/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  fetchOrder();
}
