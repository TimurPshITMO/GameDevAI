// api/test-proxy.js
export default async function handler(req, res) {
  try {
    // Запрашиваем HTTP-версию httpbin.org (именно HTTP, чтобы симулировать проблему!)
    const response = await fetch("http://httpbin.org/ip", {
      method: req.method,
      headers: req.headers,
    });

    // Копируем заголовки из ответа httpbin
    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Возвращаем статус и тело
    res.status(response.status).json(await response.json());
  } catch (error) {
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}