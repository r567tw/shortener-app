import { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const { data } = await axios.post<{ token: string }>(
        "https://project.r567tw.cc/api/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("jwt", data.token);
      window.location.href = "/";
    } catch {
      alert("登入失敗");
    }
  }

  return (
    <div className="flex flex-col items-center mt-20 space-y-4">
      <h1 className="text-2xl font-bold">登入</h1>
      <input
        className="border p-2 w-64"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-64"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        登入
      </button>
    </div>
  );
};
export default Login;
