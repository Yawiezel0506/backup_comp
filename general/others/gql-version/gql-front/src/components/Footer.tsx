import * as React from 'react';
import { Box, Grid, Link, Typography, Container, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';


const socialMediaLinks = {
  facebook: 'https://www.facebook.com/TikshuvIDF/?locale=he_IL',
  twitter: 'https://twitter.com/TikshuvCharedim',
  instagram: 'https://www.instagram.com/tikshuv.idf/?hl=he',
};

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'rgb(35,47,62)',
        color: 'rgb(255,255,255)',
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth={false} >
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h2" color="color: 'rgb(255,255,255)'" gutterBottom>
            QuadBros Market
            </Typography>
            <img src="/footer-icon.svg" alt="Logo" width="120" />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="color: 'rgb(255,255,255)'" gutterBottom>
              PRODUCT
            </Typography>
            <Link href="#" color="inherit" display="block">Features</Link>
            <Link href="#" color="inherit" display="block">Integrations</Link>
            <Link href="#" color="inherit" display="block">Pricing</Link>
            <Link href="#" color="inherit" display="block">FAQ</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="color: 'rgb(255,255,255)'" gutterBottom>
              COMPANY
            </Typography>
            <Link href="#" color="inherit" display="block">About Us</Link>
            <Link href="#" color="inherit" display="block">Careers</Link>
            <Link href="#" color="inherit" display="block">Privacy Policy</Link>
            <Link href="#" color="inherit" display="block">Terms of Service</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="color: 'rgb(255,255,255)'" gutterBottom>
              DEVELOPERS
            </Typography>
            <Link href="#" color="inherit" display="block">Public API</Link>
            <Link href="#" color="inherit" display="block">Documentation</Link>
            <Link href="#" color="inherit" display="block">Guides</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="color: 'rgb(255,255,255)'" gutterBottom>
              SOCIAL MEDIA
            </Typography>
            <IconButton aria-label="Facebook" color="inherit" component="a" href={socialMediaLinks.facebook} target='_blanc'>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit" component="a" href={socialMediaLinks.twitter} target='_blanc'>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit" component="a" href={socialMediaLinks.instagram} target='_blanc'>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="color: 'rgb(255,255,255)'" align="center" sx={{ pt: 4 }}>
          © 2024 Company Co. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
