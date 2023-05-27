import { Navigate, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "pages/NotFoundPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, userActions } from "store/slices/userSlice";
import { AuthenticationPage } from "pages/AuthenticationPage";
import { AuthLayout } from "layouts/AuthLayout";
import { FarmerLayout } from "layouts/FarmerLayout";
import { MarketPage } from "pages/MarketPage";
import { $api } from "api/services";
import { ChatPage } from "pages/ChatPage";
import { FarmersPage, FarmersProfilePage } from "pages/Farmers";
import { CartPage } from "pages/CartPage";
import { MyProductsPage } from "pages/MyProductsPage";
import { CategoryPage } from "pages/CategoryPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isAuth = user !== null;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      $api.getMe().then(({ data }) => dispatch(userActions.setUser(data)));
    }
  }, []);

  return (
    <div className="app">
      <Routes>
        {isAuth ? (
          user.role === "user" ? (
            <Route path={"/"} element={<AuthLayout />}>
              <Route index element={<MarketPage />} />
              <Route path="/:id" element={<CategoryPage />} />
              <Route path="/login" element={<Navigate to={"/"} />} />
              <Route path="/chats" element={<ChatPage />} />
              <Route path="chats/chat/:id" element={<ChatPage />} />
              <Route path="/farmers" element={<FarmersPage />} />
              <Route
                path="/farmers/profile/:id"
                element={<FarmersProfilePage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          ) : user.role === "farmer" ? (
            <Route path={"/"} element={<FarmerLayout />}>
              <Route index element={<MarketPage />} />
              <Route path="/:id" element={<CategoryPage />} />
              <Route path="/login" element={<Navigate to={"/"} />} />
              <Route path="chats" element={<ChatPage />} />
              <Route path="chats/chat/:id" element={<ChatPage />} />
              <Route path="/farmers" element={<FarmersPage />} />
              <Route
                path="/farmers/profile/:id"
                element={<FarmersProfilePage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/MyProducts" element={<MyProductsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          ) : user.role === "admin" ? (
            <Route path={"/"} element={<FarmerLayout />}>
              <Route index element={<MarketPage />} />
              <Route path="/:id" element={<CategoryPage />} />
              <Route path="/login" element={<Navigate to={"/"} />} />
              <Route path="chats" element={<ChatPage />} />
              <Route path="chats/chat/:id" element={<ChatPage />} />
              <Route path="/farmers" element={<FarmersPage />} />
              <Route
                path="/farmers/profile/:id"
                element={<FarmersProfilePage />}
              />
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
