import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://crisis-pypw.onrender.com/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error(err);
      alert("❌ خطأ في الاتصال بالـ API");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", direction: "rtl" }}>
      <h1>⚡ دائرة إدارة الكوارث والأزمات الصناعية</h1>
      <input
        type="text"
        placeholder="اكتب وصف الحالة…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 10, width: "70%", marginRight: 10 }}
      />
      <button onClick={handleSearch} style={{ padding: 10 }}>بحث</button>
      {loading && <p>جاري البحث...</p>}
      <div style={{ marginTop: 20 }}>
        {results.length === 0 && !loading && <p>لا توجد نتائج بعد.</p>}
        {results.map((r, idx) => (
          <div key={idx} style={{ background: "#1f1f1f", color: "#fff", padding: 14, borderRadius: 8, marginBottom: 12 }}>
            <b>الوصف:</b> {r.description || r["وصف الحالة أو الحدث"]} <br />
            <b>الإجراء:</b> <span style={{ background: "#ff6600", color: "#fff", padding: "4px 8px", borderRadius: 6 }}>
              {r.action || r["الإجراء"]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
