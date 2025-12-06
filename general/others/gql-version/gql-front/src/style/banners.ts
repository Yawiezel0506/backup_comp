type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type Position = "static" | "relative" | "absolute" | "sticky" | "fixed";
type TextAlign = "left" | "right" | "center" | "justify" | "inherit"

export const bannerCard = {
  minWidth: "300px",
  flexShrink: 0,
  margin: "5px",
  position: "relative" as Position,
  display: "flex",
  flexDirection: "column" as FlexDirection,
  alignItems: "center",
  textAlign: "center" as TextAlign,
};

export const class_scrolling_container = {
  display: "flex",
  flexWrap: "nowrap" as FlexWrap,
};

export const hide_scrollbar = {
  display: "flex",
  overflowX: "auto" as const,
  backgroundColor: "#E0E0E0",
  border: "2px solid #B3B3B3",
  padding: "1.2rem",
  marginBottom: "2rem",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
};
