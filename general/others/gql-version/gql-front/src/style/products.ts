import { themeSettings } from "../palette/theme";

export const cardStyle = {
  margin: "0.5em",
  width: "15em",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  transition: "box-shadow 0.3s, transform 0.3s",
  ":hover": {
    boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.2)",
    transform: "translateY(-10px)",
  },
};

export const typographyH2Style = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "1.5em",
  color: themeSettings.palette.grey[800],
};

export const typographyH3Style = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "3.5em",
};

export const typographyH3PriceStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "1.1em",
  color: themeSettings.palette.teal[700],
};

export const stackBottom = {
  width: "100%",
  justifyContent: "space-between",
  padding: "0.5em",
};

export const buttonAddToCart = {
  color: themeSettings.palette.teal[800],
  justifySelf: "top",
  "&:hover": {
    backgroundColor: themeSettings.palette.teal[800],
    color: themeSettings.palette.teal[100],
  },
};

export const quantityOnCard = {
  color: themeSettings.palette.teal[800],
  justifySelf: "top",
  "&:hover": {
    background: "none",
  },
};
