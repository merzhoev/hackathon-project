import { Navigate, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "pages/NotFoundPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, userActions } from "store/slices/userSlice";
import { AuthenticationPage } from "pages/AuthenticationPage";
import { AuthLayout } from "layouts/AuthLayout";

const fakeFetchUser = (ms) => {
  return new Promise(res => setTimeout(res, ms, { token: 'some_access_token', name: 'alex', age: 20 }))
}

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const isAuth = true;

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      // fetch user by token
      // fakeFetchUser(2000).then((user) => {
      //   dispatch(userActions.setUser(user))
      // })
    }
  }, [])

  // TODO
  // Показывать роуты в зависимости от isAuth
  // Так же показывать индикатор загрузки (создать компонент), пока идет запрос на сервер
  return (
    <div className="app">
      <Routes>
        {isAuth ? (
          <Route path={'/'} element={<AuthLayout />}>
            <Route index element={<div>home page</div>} />
            <Route path="/login" element={<Navigate to={'/'} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        ) : (
          <>
            <Route path={'/login'} element={<AuthenticationPage />} />
            <Route path="*" element={<Navigate to={'/login'} />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
