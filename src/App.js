import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await fetch(`https://crisis-pypw.onrender.com/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('خطأ في الاتصال بالـ API');
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>بحث الكوارث</h1>
      <input 
        type="text" 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
        placeholder="اكتب وصف الحالة…" 
        style={{ width: 300, marginRight: 10 }}
      />
      <button onClick={handleSearch}>بحث</button>
      <pre style={{ background: '#f0f0f0', padding: 10 }}>{result}</pre>
    </div>
  );
}

export default App;
