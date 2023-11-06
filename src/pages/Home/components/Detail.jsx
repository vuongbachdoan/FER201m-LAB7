import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { getOneFlower } from "../../../core/services/api";
import StarIcon from '@mui/icons-material/Star';

export const Detail = () => {
    const { flowerId } = useParams();
    const [flowerData, setFlowerData] = React.useState(null);
    React.useEffect(() => {
        if (flowerId) {
            getOneFlower(flowerId)
                .then((res) => {
                    setFlowerData(res);
                })
                .catch((err) => console.error(err));
        }
    }, [flowerId]);

    return (
        <Card
            style={{
                borderRadius: '20px'
            }}
        >
            <CardActionArea>
                <Avatar style={{
                    marginBottom: 30,
                    width: '240px',
                    height: '240px',
                    objectFit: 'cover',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }} alt={flowerData?.name} src={flowerData?.image} />
                <CardContent>
                    <Typography textAlign='center' gutterBottom variant="h4" component="div">
                        Name: {flowerData?.name}
                    </Typography>
                    <Typography textAlign='center' gutterBottom variant="h6" component="div">
                        Price: {flowerData?.price} $
                    </Typography>
                    <Typography textAlign='center' gutterBottom variant="h6" component="div">
                        Color: {flowerData?.color}
                    </Typography>
                    <Typography textAlign='center' gutterBottom variant="h6" component="div">
                        Origin: {flowerData?.origin}
                    </Typography>
                    <Typography textAlign='center' variant="body2" color="text.secondary">
                        {
                            flowerData?.rating === 1 &&
                            <StarIcon />
                        }
                        {
                            flowerData?.rating === 2 &&
                            <>
                                <StarIcon /><StarIcon />
                            </>
                        }
                        {
                            flowerData?.rating === 3 &&
                            <>
                                <StarIcon /><StarIcon /><StarIcon />
                            </>
                        }
                        {
                            flowerData?.rating === 4 &&
                            <>
                                <StarIcon /><StarIcon /><StarIcon /><StarIcon />
                            </>
                        }
                        {
                            flowerData?.rating === 5 &&
                            <>
                                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                            </>
                        }
                    </Typography>
                    <Typography textAlign='center' variant="body2" color="text.secondary">
                        Category: {flowerData?.category}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}