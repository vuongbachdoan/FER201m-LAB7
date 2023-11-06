import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const FlowerCard = ({data}) => {
  const navigate = useNavigate();

  const handleViewDetail = (flowerId) => {
    navigate(`/detail/${flowerId}`);
  }

  return (
    <Card
      style={{
        borderRadius: 20
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={data?.image}
          alt={data?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {data?.name} 
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Rating: {data?.rating}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Price: {data?.price} $
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Category: {data?.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Button variant='contained' style={{
          padding: 10,
          borderRadius: 15,
          minWidth: 100,
          backgroundColor: '#0A0A0A',
          boxShadow: 'none',
        }} onClick={() => handleViewDetail(data?.id)} size="small" color="primary">
          Detail
        </Button>
      </CardActions>
    </Card>
  );
}
