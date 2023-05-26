import { Navigate, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "pages/NotFoundPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, userActions } from "store/slices/userSlice";
import { AuthenticationPage } from "pages/AuthenticationPage";
import { AuthLayout } from "layouts/AuthLayout";
import { FarmerLayout } from "layouts/FarmerLayout";
import { $api } from "api/services";
import { ChatPage } from "pages/ChatPage";

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const isAuth = user !== null;

  console.log(user)

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      $api.getMe()
        .then(({ data }) => dispatch(userActions.setUser(data)))
    }
  }, []);

  console.log(user)

  // arbimerhzoev@mail.ru
  return (
    <div className="app">
      <Routes>
        {isAuth ? (
          user.role === "user" ? (
            <Route path={"/"} element={<AuthLayout />}>
              <Route index element={<div>home page</div>} />
              <Route path="/login" element={<Navigate to={"/"} />} />
              <Route path="/chats" element={<ChatPage />} />
              <Route path="chats/chat/:id" element={<ChatPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          ) : user.role === "farmer" ? (
            <Route path={"/"} element={<FarmerLayout />}>
              <Route index element={<div>home page</div>} />
              <Route path="/login" element={<Navigate to={"/"} />} />
              <Route path="chats" element={<ChatPage />} />
              <Route path="chats/chat/:id" element={<ChatPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          ) : user.role === "admin" ? (
            <Route path={"/"} element={<FarmerLayout />}>
              <Route index element={<div>home page</div>} />
              <Route path="/login" element={<Navigate to={"/"} />} />
              <Route path="chats" element={<ChatPage />} />
              <Route path="chats/chat/:id" element={<ChatPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          ) : null
        ) : (
          <>
            <Route path={"/login"} element={<AuthenticationPage />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
