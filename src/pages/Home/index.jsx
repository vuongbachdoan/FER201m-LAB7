import React from "react";
import { getAllFlowers } from "../../core/services/api";
import { sortIsTop } from "../../helper/sortIsTop";
import { FlowerCard } from "./components/FlowerCard";
import { Grid } from "@mui/material";

export const Home = () => {

    const [flowers, setFlowers] = React.useState([]);
    React.useEffect(() => {
        getAllFlowers()
            .then((res) => {
                setFlowers(sortIsTop(res));
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                {
                    flowers.map((flower) => (
                        <Grid item xs={2} sm={4} md={4}>
                            <FlowerCard data={flower}/>
                        </Grid>
                    ))
                }
            </Grid>

        </>
    );
}