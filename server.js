const express = require('express');
const app = express();
app.use(express.json());

let alertState = {
  triggered: false,
  price: null,
  symbol: null,
  message: null,
  timestamp: null,
};

app.post('/webhook', (req, res) => {
  const body = req.body;
  console.log('[Webhook received]', body);

  alertState = {
    triggered: true,
    price: body.price || null,
    symbol: body.symbol || 'XAUUSD',
    message: body.message || '금 가격 목표 도달!',
    timestamp: new Date().toISOString(),
  };

  res.status(200).json({ status: 'ok' });
});

app.get('/status', (req, res) => {
  res.json(alertState);
});

app.post('/ack', (req, res) => {
  alertState = {
    triggered: false,
    price: null,
    symbol: null,
    message: null,
    timestamp: null,
  };
  console.log('[Alert acknowledged & reset]');
  res.json({ status: 'reset' });
});

app.get('/', (req, res) => {
  res.json({ status: 'Gold Alert Server running 🟡' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
