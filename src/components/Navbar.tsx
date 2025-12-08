import { Link, useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

export default function Navbar() {
  const isLogin = isTokenValid(localStorage.getItem("jwt"));
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("jwt");
    navigate("/login", { replace: true });
  }

  return (
    <nav className="w-full flex justify-end items-center bg-gray-100 px-6 py-3 mb-8 shadow">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold">短網址系統</h1>
      </div>
      <Link className="text-gray-600 mr-6" to="/map">
        地圖
      </Link>
      {!isLogin && (
        <Link className="text-blue-500 mr-6" to="/login">
          登入
        </Link>
      )}
      {isLogin && (
        <>
          <Link className="text-green-600 mr-6" to="/">
            短網址生成
          </Link>
          <Link className="text-blue-500 mr-6" to="/history">
            查看歷史紀錄
          </Link>
          <button className="text-red-500" onClick={logout}>
            登出
          </button>
        </>
      )}
    </nav>
  );
}
