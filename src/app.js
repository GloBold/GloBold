import express from 'express';
import { generateColdEmail } from './agents/exampleAgent.js';

const app = express();
app.use(express.json());

const AUTH_TOKEN = process.env.AUTH_TOKEN;

app.post('/api/secure-agent', async (req, res) => {
  const token = req.headers['authorization'];
  if (token !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { businessName, offer } = req.body;
  const email = await generateColdEmail(businessName, offer);
  res.json({ email });
});

export default app; 