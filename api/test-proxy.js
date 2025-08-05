export default async function handler(req, res) {
  try {
    const backendResponse = await fetch("http://ваш-бэкенд" + req.url, {
      method: req.method,
      headers: req.headers,
      body: req.body
    });

    // Копируем заголовки
    backendResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Возвращаем статус и тело
    res.status(backendResponse.status).send(await backendResponse.text());
  } catch (error) {
    res.status(500).json({ error: "Proxy failed" });
  }
}