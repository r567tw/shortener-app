import { useEffect, useState } from "react";
import axios from "axios";
// import QRCode from "qrcode.react"; // Todo: 晚一點在處理 QRcode 的問題
import { API_BASE_URL, BASE_URL } from "../config";
import Navbar from "../components/Navbar";

function GoldPrice() {
  const [buyPrice, setBuyPrice] = useState<number | null>(null);
  const [sellPrice, setSellPrice] = useState<number | null>(null);

  useEffect(() => {
    fetchGoldPrice();
  }, []);

  async function fetchGoldPrice() {
    try {
      const response = await axios.get(`${API_BASE_URL}/gold-price`);
      setBuyPrice(response.data.gold_buy_price);
      setSellPrice(response.data.gold_sell_price);
    } catch (error) {
      console.error("Error fetching gold price:", error);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold">即時金價</h2>
      {buyPrice !== null && sellPrice !== null && (
        <div className="mt-4">
          <p>買入價：{buyPrice} 元/克</p>
          <p>賣出價：{sellPrice} 元/克</p>
        </div>
      )}
    </div>
  );
}

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

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-10 space-y-4">
        <h1 className="text-xl font-bold">短網址生成</h1>
        <p>請輸入要縮短的網址吧：</p>
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
                {BASE_URL}/s/{shortUrl}
              </a>
            </p>
          </div>
        )}
      </div>
      <div className="mt-12 flex justify-center">
        <GoldPrice />
      </div>
    </>
  );
};
export default Dashboard;
