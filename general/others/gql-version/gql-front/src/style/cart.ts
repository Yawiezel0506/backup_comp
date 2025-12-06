import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";



export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  export const styleDivBottom = {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-evenly",
    // position: "fixed",
    // bottom: 0 
  }

  export const stylePaper = { padding: 2, width: 300, margin: "auto", marginTop: 4 }