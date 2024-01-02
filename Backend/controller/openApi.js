async function requestAPI (payload) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  const stream = await res.json();
  try {
    if (stream.error) return stream.error.message;
    return stream?.choices[0]?.message?.content || ''

  } catch (e) {
      return e
  }
}

module.exports = requestAPI;