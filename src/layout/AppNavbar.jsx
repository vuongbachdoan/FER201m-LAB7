import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../core/config/firebase';
import { signOut } from 'firebase/auth';
import { UserContext } from '../routes';

const pages = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Dashboard',
        path: '/dashboard'
    },
    {
        name: 'Contact',
        path: '/contact'
    }
];

export const AppNavbar = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = React.useState(null);
    const { user, setUser } = React.useContext(UserContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    React.useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    return (
        <AppBar position="fixed"
            style={{
                backgroundColor: '#000'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            PaperProps={{
                                style: {
                                    padding: '10px',
                                    borderRadius: '20px',
                                    minWidth: '150px'
                                }
                            }}

                        >
                            {pages.map((page) => (
                                <MenuItem
                                    style={{
                                        borderRadius: '10px'
                                    }}
                                    key={page} onClick={handleCloseNavMenu}>
                                    <Link to={page.path} style={{ textDecoration: 'none', color: '#0A0A0A' }}><Typography textAlign="center">{page.name}</Typography></Link>
                                </MenuItem>
                            ))}
                            {
                                !currentUser &&
                                <MenuItem
                                    style={{
                                        borderRadius: '10px'
                                    }}
                                    onClick={() => signOut()}>
                                    <Link to='/login' style={{ textDecoration: 'none', color: '#0A0A0A' }}><Typography textAlign="center">Login</Typography></Link>
                                </MenuItem>
                            }
                            {
                                currentUser &&
                                <>
                                    <MenuItem
                                        style={{
                                            borderRadius: '10px'
                                        }}
                                        onClick={() => navigate('user')}>
                                        <Link style={{ textDecoration: 'none', color: '#0A0A0A' }}><Typography textAlign="center">User Manage</Typography></Link>
                                    </MenuItem>
                                    <MenuItem
                                        style={{
                                            borderRadius: '10px'
                                        }}
                                        onClick={() => {
                                            signOut(auth)
                                                .then((res) => {
                                                    navigate('/login')
                                                })
                                        }}>
                                        <Link style={{ textDecoration: 'none', color: '#0A0A0A' }}><Typography textAlign="center">Logout</Typography></Link>
                                    </MenuItem>
                                </>
                            }
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.path}
                                onClick={() => navigate(page.path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                        {
                            currentUser &&
                            <>
                                <Button
                                    onClick={() => navigate('/user')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    User Manage
                                </Button>

                                <Button
                                    onClick={() => {
                                        signOut(auth)
                                            .then((res) => {
                                                navigate('/login')
                                            })
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Logout
                                </Button>
                            </>
                        }
                        {
                            !currentUser &&
                            <Button
                                onClick={() => navigate('/login')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Login
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}