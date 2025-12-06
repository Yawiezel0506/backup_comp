import Skeleton from '@mui/material/Skeleton';
import { Grid, Card, CardContent, Typography } from '@mui/material';

export default function HomeSkeleton() {
    return (
        Array.from({ length: 18 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: "100%", width: "100%" }}>
                    <Skeleton width={"60%"} />
                    <CardContent>
                        <Typography variant="h2">
                            <Skeleton variant="rectangular" width={"100%"} height={170} />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ))

    );
}