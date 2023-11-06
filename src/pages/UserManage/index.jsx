import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { deleteUser, getAllUsers, updateUser } from '../../core/services/user';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

export const UserManage = () => {
    const [users, setUsers] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        getAllUsers()
            .then((res) => {
                setUsers(res);
            })
            .catch((err) => console.error(err));
    }

    const handleDelete = (userId) => {
        deleteUser(userId)
            .then(() => {
                alert('Delete successfully!');
                loadUsers();
            })
            .catch(() => {
                alert('Fail to delete!');
            })
    }

    const [selectedUser, setSelectedUser] = React.useState(null);
    const [updateData, setUpdateData] = React.useState({
        id: selectedUser,
        username: '',
        email: '',
        photo: ''
    });
    const handleUpdate = () => {
        updateUser(selectedUser, updateData)
            .then(() => {
                loadUsers();
                alert('Successfully update!');
                setOpen(false);
            })
            .catch(() => {
                alert('Fail to update!');
                setOpen(false);
            })
    }

    return (
        <>
            <TableContainer
                style={{
                    borderRadius: 20
                }}
                component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>UID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">EMAIL</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Thumbnail URL</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Edit</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.uid}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell align="right">{user.username}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.photo}</TableCell>
                                <TableCell
                                    style={{ cursor: 'pointer' }}
                                    align="center"
                                    onClick={() => {
                                        setSelectedUser(user.id);

                                        setUpdateData({
                                            ...user
                                        })

                                        setOpen(true);
                                    }}
                                >
                                    <Edit />
                                </TableCell>
                                <TableCell
                                    style={{ cursor: 'pointer' }}
                                    align="center"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    <Delete />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update User Information</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        defaultValue={updateData.username}
                        onChange={(e) => {
                            setUpdateData({
                                ...updateData,
                                username: e.target.value
                            })
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Thumbnail URL"
                        type="text"
                        fullWidth
                        defaultValue={updateData.photo}
                        onChange={(e) => {
                            setUpdateData({
                                ...updateData,
                                photo: e.target.value
                            })
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}