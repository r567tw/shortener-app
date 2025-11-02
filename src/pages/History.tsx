import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { type ShortUrl } from "../types";

const History: React.FC = () => {
  const [records, setRecords] = useState<ShortUrl[]>([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get<ShortUrl[]>("/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(data);
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
          <li key={r.id} className="border p-2 rounded">
            <p>原始網址：{r.original_url}</p>
            <p>
              短網址：
              <a
                className="text-blue-600"
                href={r.short_url}
                target="_blank"
                rel="noreferrer"
              >
                {r.short_url}
              </a>
            </p>
            <p>建立時間：{new Date(r.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default History;
