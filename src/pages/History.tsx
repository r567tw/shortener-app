import { useEffect, useState } from "react";
import axios from "axios";
import { type ShortUrl } from "../types";
import { API_BASE_URL, BASE_URL } from "../config";
import Navbar from "../components/Navbar";
import { QRCodeSVG } from "qrcode.react";

type Metadata = {
  current_page: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
};

const History: React.FC = () => {
  const [records, setRecords] = useState<ShortUrl[]>([]);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  async function fetchData(url = `${API_BASE_URL}/short-url`) {
    const token = localStorage.getItem("jwt");
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    setRecords(result.data.data);
    setMetadata(result.data.meta);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">歷史紀錄</h1>
        <div className="mt-4 space-y-2">
          {records.map((r) => (
            <div
              key={r.short}
              className="mt-6 border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="mb-2">原始網址：{r.url}</p>
                <p>
                  短網址：
                  <a
                    className="text-blue-600 hover:underline ml-1"
                    href={`${BASE_URL}/s/${r.short}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {`${BASE_URL}/s/${r.short}`}
                  </a>
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <QRCodeSVG value={`${BASE_URL}/s/${r.short}`} size={80} />
              </div>
            </div>
          ))}
        </div>

        {/* 分頁元件 */}
        {metadata && (
          <div className="flex gap-2 mt-6 justify-center">
            {metadata.links.map((link, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded ${
                  link.active
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                disabled={!link.url}
                onClick={() => link.url && fetchData(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default History;
