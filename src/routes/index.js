import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { Contact } from '../pages/Contact';
import { Dashboard } from '../pages/Dashboard';
import { Home } from '../pages/Home';
import { Detail } from '../pages/Home/components/Detail';
import { StaffUpdate } from '../pages/Dashboard/components/StaffUpdate';
import { FlowerAdd } from '../pages/Dashboard/components/FlowerAdd';
import { Login } from '../pages/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../core/config/firebase';
import { UserManage } from '../pages/UserManage';

export const UserContext = React.createContext();
export const AppRouting = () => {
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(!user) {
                setUser(null);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='' element={<Home />} />
                    <Route path='/detail/:flowerId' element={<Detail />} />
                    <Route path='/update/:flowerId' element={<StaffUpdate />} />
                    <Route path='/add' element={<FlowerAdd />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/user' element={<UserManage />} />
                </Route>
                {/* <Route path='*' element={<Error />} /> */}
            </Routes>
        </UserContext.Provider>
    );
};