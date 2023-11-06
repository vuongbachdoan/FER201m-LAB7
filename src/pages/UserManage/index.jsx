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
import { getAllUsers } from '../../core/services/user';

export const UserManage = () => {
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        getAllUsers()
            .then((res) => {
                setUsers(res);
            })
            .catch((err) => console.error(err));
    }, [])

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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

}