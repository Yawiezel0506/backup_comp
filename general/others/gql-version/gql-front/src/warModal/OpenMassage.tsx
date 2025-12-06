import { useState, useEffect } from "react";
import { styleModal } from "./style";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeButton, stylePaper } from "./style";


const OpenMassage = () => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("warMassage")) return;
    setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("warMassage", "true");
    }, 2000);
  }, []);

  useEffect(() => {
    const onNewTab = () => {
      setOpen(true);
    };
    window.addEventListener("storage", onNewTab);
    return () => {
      window.removeEventListener("storage", onNewTab);
    };
  }, []);

  return (
    <Modal open={open}>
      <Box sx={styleModal}>
        <Paper
          elevation={3}
          sx={stylePaper}
        >
          <Box>
            <Button
              sx={closeButton}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </Button>
          </Box>
          <br />
          <Typography variant="h4" gutterBottom fontWeight={700}>
            לקוחות יקרים!
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            בעקבות המצב הביטחוני השורר בארץ, יתכן ויחולו עיכובים במועדי אספקת
            המוצרים.
          </Typography>
          <br />
          <Typography variant="h6" fontWeight={700}>
            ע"פ הנחיות פיקוד העורף, לא יתקיימו משלוחים ליישובי העוטף והיישובים בגבול
            הצפון.
          </Typography>
        </Paper>
      </Box>
    </Modal>
  );
};

export default OpenMassage;