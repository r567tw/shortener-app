import { useState } from "react";
import axios from "axios";
// import QRCode from "qrcode.react"; // Todo: 晚一點在處理 QRcode 的問題
import { Link } from "react-router-dom";
import { API_BASE_URL, BASE_URL } from "../config";

const Dashboard: React.FC = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function generate() {
    try {
      const token = localStorage.getItem("jwt");
      const result = await axios.post(
        `${API_BASE_URL}/short-url`,
        { url },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShortUrl(result.data.data.short);
    } catch {
      alert("生成失敗");
    }
  }

  function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "/login";
  }

  return (
    <div className="flex flex-col items-center mt-10 space-y-4">
      <h1 className="text-xl font-bold">短網址生成</h1>
      <input
        className="border p-2 w-96"
        placeholder="輸入要縮短的網址"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={generate}
      >
        生成
      </button>

      {shortUrl && (
        <div className="mt-4 text-center">
          <p className="font-semibold text-blue-600">
            生成短網址：
            <a
              href={`${BASE_URL}/s/${shortUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              {BASE_URL}/s/
              {shortUrl}
            </a>
          </p>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        <Link className="text-blue-500" to="/history">
          查看歷史紀錄
        </Link>
        <button className="text-red-500" onClick={logout}>
          登出
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
