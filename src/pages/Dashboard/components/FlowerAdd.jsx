import React from "react";
import { createOneFlower, getAllFlowers } from "../../../core/services/api";
import { scrollToTop } from "../../../helper/scrollToTop";
import { validateData } from "../../../helper/validateData";
import { Alert, Avatar, Box, Button, Collapse, IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

export const FlowerAdd = () => {
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openWarning, setOpenWarning] = React.useState(false);
    const [failValidateMessages, setFailValidateMessages] = React.useState([]);
    const [flowerData, setFlowerData] = React.useState({
        name: '',
        rating: '',
        price: '',
        image: '',
        id: null,
        isTopOfTheWeek: false,
        color: '',
        origin: '',
        category: ''
    });

    React.useEffect(() => {
        handleCreateId();
    }, []);

    const handleCreateId = () => {
        getAllFlowers()
            .then((res) => {
                const currentId = 1 + res.length;
                setFlowerData({
                    ...flowerData,
                    id: currentId
                })
            })
    }

    const handleName = (val) => {
        setFlowerData({
            ...flowerData,
            name: val
        })
    }

    const handleRating = (val) => {
        setFlowerData({
            ...flowerData,
            rating: val
        })
    }

    const handlePrice = (val) => {
        setFlowerData({
            ...flowerData,
            price: val
        })
    }

    const handleImage = (val) => {
        setFlowerData({
            ...flowerData,
            image: val
        })
    }

    const handleTopOfWeek = (val) => {
        setFlowerData({
            ...flowerData,
            isTopOfTheWeek: val
        })
    }

    const handleColor = (val) => {
        setFlowerData({
            ...flowerData,
            color: val
        })
    }

    const handleOrigin = (val) => {
        setFlowerData({
            ...flowerData,
            origin: val
        })
    }

    const handleCategory = (val) => {
        setFlowerData({
            ...flowerData,
            category: val
        })
    }

    const handleAddFlower = () => {
        const errorMessages = validateData(flowerData);

        if (errorMessages.length === 0) {
            createOneFlower(flowerData)
                .then(() => {
                    scrollToTop();
                    setOpenAlert(true);
                    setTimeout(() => {
                        setOpenAlert(false);
                    }, 3000);
                    setOpenWarning(false);
                    setFailValidateMessages([]);
                })
                .catch((err) => console.error(err))
        } else {
            setFailValidateMessages(errorMessages);
            setOpenWarning(true);
        }
    }

    const clearForm = () => {
        setFlowerData({
            name: '',
            rating: '',
            price: '',
            image: '',
            color: '',
            origin: '',
            category: '',
            isTopOfTheWeek: false
        })
    }

    return (
        <>
            <Collapse in={openAlert}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    You have add successfully!
                </Alert>
            </Collapse>

            <Stack flexDirection='column' alignItems='center' width='100%'>
                <Box
                    minWidth={320}
                >
                    <Typography textAlign='center' marginBottom='30px' textTransform='uppercase' fontSize='30' fontWeight='bold'>Add flower information</Typography>

                    <Avatar style={{
                        marginBottom: 30,
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }} alt={flowerData?.name} src={flowerData?.image} />

                    <Stack spacing={2}>
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Name"
                            id="outlined-size-small"
                            value={flowerData?.name}
                            onChange={(e) => handleName(e.target.value)}
                            size="small"
                        />
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Rating"
                            id="outlined-size-small"
                            value={flowerData?.rating}
                            onChange={(e) => handleRating(e.target.value)}
                            size="small"
                            type="number"
                        />
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Price"
                            id="outlined-size-small"
                            type="number"
                            value={flowerData?.price}
                            onChange={(e) => handlePrice(e.target.value)}
                            size="small"
                        />
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Image"
                            id="outlined-size-small"
                            value={flowerData?.image}
                            onChange={(e) => handleImage(e.target.value)}
                            size="small"
                        />
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Color"
                            id="outlined-size-small"
                            value={flowerData?.color}
                            onChange={(e) => handleColor(e.target.value)}
                            size="small"
                        />
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Category"
                            id="outlined-size-small"
                            value={flowerData?.category}
                            onChange={(e) => handleCategory(e.target.value)}
                            size="small"
                        />
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Origin"
                            id="outlined-size-small"
                            value={flowerData?.origin}
                            onChange={(e) => handleOrigin(e.target.value)}
                            size="small"
                        />
                        
                        <Collapse in={openWarning}>
                            <Alert
                                style={{
                                    maxWidth: 320
                                }}
                                severity="warning"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpenWarning(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {
                                    failValidateMessages.map((message) => (
                                        <Typography fontSize='12px'>{message}</Typography>
                                    ))
                                }
                            </Alert>
                        </Collapse>
                        <Stack alignItems='flex-end' onClick={clearForm}>
                            <Typography style={{
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}>Clear form</Typography>
                        </Stack>
                        <Button
                            variant='contained' style={{
                                padding: 10,
                                borderRadius: 10,
                                minWidth: 100,
                                backgroundColor: '#0A0A0A'
                            }}
                            onClick={handleAddFlower}>Add</Button>
                        <Link style={{ textAlign: 'center' }} to='/dashboard'>
                            <Typography marginTop='5px' marginBottom='15px'>Back to dashboard</Typography>
                        </Link>
                    </Stack>
                </Box>
            </Stack>
        </>
    );
}