import Skeleton from '@mui/material/Skeleton';
import { Grid, Card, CardContent, Typography, Stack } from '@mui/material';

export default function ProductSkeleton() {
    return (
        Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: "100%", width: "15em", margin: "0.5em" }}>
                    <Skeleton variant="rectangular" width={"100%"} height={200} />
                    <CardContent>
                        <Typography variant="h2">
                            <Skeleton width={"60%"} height={"2rem"} />
                            <Skeleton width={"80%"} height={"2rem"} />
                            <Stack display={'flex'} justifyContent={"space-between"}>
                                <Skeleton width={"20%"} height={"2rem"} />
                                <Skeleton width={"20%"} height={"2rem"} />
                            </Stack>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ))

    );
}