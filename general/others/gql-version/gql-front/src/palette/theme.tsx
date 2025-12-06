export const tokens = {
    grey: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121"
    },
    primary: {
        // light green
        100: "#d0fcf4",
        200: "#a0f9e9",
        300: "#71f5de",
        400: "#41f2d3",
        500: "#12efc8",
        600: "#0ebfa0",
        700: "#0b8f78",
        800: "#076050",
        900: "#043028",
    },
    secondary: {
        // yellow
        100: "#fcf0dd",
        200: "#fae1bb",
        300: "#f7d299",
        400: "#f5c377",
        500: "#f2b455",
        600: "#c29044",
        700: "#916c33",
        800: "#614822",
        900: "#302411",
    },
    tertiary: {
        // purple
        500: "#8884d8",
    },
    teal: {
        50: "#e0f2f1",
        100: "#b2dfdb",
        200: "#80cbc4",
        300: "#4db6ac",
        400: "#26a69a",
        500: "#009688",
        600: "#00897b",
        700: "#00796b",
        800: "#00695c",
        900: "#004d40"
    },
    background: {
        light: "#2d2d34",
        main: "#1f2026",
    },
};

// mui theme settings
export const themeSettings = {
    palette: {
        primary: {
            ...tokens.primary,
            main: tokens.primary[500],
            light: tokens.primary[400],
        },
        secondary: {
            ...tokens.secondary,
            main: tokens.secondary[500],
        },
        tertiary: {
            ...tokens.tertiary,
        },
        grey: {
            ...tokens.grey,
            main: tokens.grey[500],
        },
        background: {
            default: tokens.background.main,
            light: tokens.background.light,
        },
        teal: {
            ...tokens.teal,
            main: tokens.teal[500],
        }
    },
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 32,
        },
        h2: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 24,
        },
        h3: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 20,
            fontWeight: 800,
            color: tokens.grey[200],
        },
        h4: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 14,
            fontWeight: 600,
            color: tokens.grey[300],
        },
        h5: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            fontWeight: 400,
            color: tokens.grey[500],
        },
        h6: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 10,
            color: tokens.grey[700],
        },
    },
};