export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const token = req.headers['authorization'];
  if (token !== `Bearer ${process.env.AUTH_TOKEN}`) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { businessName, offer } = req.body;

  if (!businessName || !offer) {
    return res.status(400).json({ error: 'Missing businessName or offer' });
  }

  const email = `Hi ${businessName},\n\nI wanted to reach out to share an opportunity with you. Our team at GloBold Enterprise is offering a powerful AI solution tailored to help small businesses like yours with ${offer}.\n\nIf this sounds interesting, I'd love to connect further!`;

  return res.status(200).json({ email });
} 