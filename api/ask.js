// Vercel Serverless Function: /api/ask
// 把网站上的提问转发给 DeepSeek，并带上莫心雅的知识库。
// 需要在 Vercel 项目设置里配置环境变量 DEEPSEEK_API_KEY。

const SYSTEM_PROMPT = require('./knowledge.js');

const ALLOWED_ORIGINS = [
  'https://cynthia-mo-ya.github.io',
  'http://localhost:8765',
  'http://127.0.0.1:8765'
];

// 简易限流（同一实例内每 IP 每分钟 8 次）
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const rec = (hits.get(ip) || []).filter(t => now - t < 60000);
  if (rec.length >= 8) return true;
  rec.push(now);
  hits.set(ip, rec);
  return false;
}

module.exports = async (req, res) => {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'too many requests' });
  }

  const { question, lang } = req.body || {};
  if (!question || typeof question !== 'string' || question.length > 200) {
    return res.status(400).json({ error: 'bad question' });
  }
  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: 'DEEPSEEK_API_KEY not configured' });
  }

  try {
    const r = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: (lang === 'en' ? 'Answer in English. ' : '请用中文回答。') + question }
        ],
        max_tokens: 400,
        temperature: 0.8
      })
    });
    if (!r.ok) {
      const detail = await r.text();
      return res.status(502).json({ error: 'deepseek error', detail: detail.slice(0, 200) });
    }
    const data = await r.json();
    const answer = data.choices?.[0]?.message?.content?.trim();
    if (!answer) return res.status(502).json({ error: 'empty answer' });
    return res.status(200).json({ answer });
  } catch (e) {
    return res.status(500).json({ error: 'proxy failure', detail: String(e).slice(0, 200) });
  }
};
