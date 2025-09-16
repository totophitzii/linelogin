import Image from "next/image";
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");

  useEffect(() => {
    const initLiff = async () => {
      // @ts-ignore
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID });

      // @ts-ignore
      if (!liff.isLoggedIn()) {
        // @ts-ignore
        liff.login();
      } else {
        // @ts-ignore
        const profile = await liff.getProfile();
        setUserName(profile.displayName);
        setUserId(profile.userId);
      }
    };

    initLiff();
  }, []);

  const handleSubmit = async () => {
    const data = { userId, productId, qty };

    const res = await fetch(process.env.NEXT_PUBLIC_GAS_URL!, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (json.status === "ok") {
      alert("บันทึกการเบิกเรียบร้อย ✅");
      setProductId("");
      setQty("");
    } else {
      alert("เกิดข้อผิดพลาด ❌ " + json.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">ระบบเบิกสต็อก</h1>
      <p className="mb-4">👤 {userName}</p>

      <input
        className="border p-2 mb-2"
        placeholder="รหัสสินค้า"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        className="border p-2 mb-2"
        type="number"
        placeholder="จำนวน"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        เบิกของ
      </button>
    </main>
  );
}
 
