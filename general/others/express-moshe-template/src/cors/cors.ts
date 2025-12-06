import cors, { CorsOptions } from "cors";

const whiteList = [
  "0.0.0.0/0"
];

const corsOptions: CorsOptions = {
  origin: whiteList,
};

const corsHandler = cors(corsOptions);

export default corsHandler;
