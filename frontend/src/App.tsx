import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';

import windowExtends from './windowExtends';
import Theme from './Theme';

windowExtends();

const MainPage = React.lazy(() => import('@pages/MainPage/MainPage'));
const LoginPage = React.lazy(() => import('@pages/LoginPage'));

function App() {
  const {isAuth} = useAppSelector(state => state.user);

  return (
    <Theme>
      <div className="App">
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            {!isAuth && <Route path="/login" element={<LoginPage/>}/>}
            <Route path="*" element={isAuth ? <MainPage/> : <LoginPage/>}/>
          </Routes>
        </Suspense>
      </div>
    </Theme>

  );
}

export default App;
