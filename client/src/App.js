import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
} from "react-router-dom";
import Tpl_login from './templates/tpl_login';
import { UserContext } from './contex';
import AppRouter from './components/AppRouter';
import SnackbarProvider from 'react-simple-snackbar';

function App() {
  const [user, setUser] = useState({username: null, login:'nul1l', isAuth: false, role: 0, permissions:{}})
  /** при загрузке страницы узнаем если пользователь имеет действительный токен то подтягиваем все данные */

  return (
    <UserContext.Provider value={{
      user,
      setUser
      }}>
      <SnackbarProvider>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </SnackbarProvider>
    </UserContext.Provider>
  );
}

export default App;
