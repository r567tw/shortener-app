import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { type ShortUrl } from "../types";
import { API_BASE_URL, BASE_URL } from "../config";

const History: React.FC = () => {
  const [records, setRecords] = useState<ShortUrl[]>([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("jwt");
      const result = await axios.get(`${API_BASE_URL}/short-url`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setRecords(result.data.data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">歷史紀錄</h1>
      <Link className="text-blue-500" to="/">
        ← 回生成頁
      </Link>
      <ul className="mt-4 space-y-2">
        {records.map((r) => (
          <li key={r.short} className="border p-2 rounded">
            <p>原始網址：{r.url}</p>
            <p>
              短網址：
              <a
                className="text-blue-600"
                href={`${BASE_URL}/s/${r.short}`}
                target="_blank"
                rel="noreferrer"
              >
                {r.short}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default History;
