// api/submit.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();
    return res.status(response.status).json(result);
  } catch (error) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
