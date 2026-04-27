import https from 'https';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = JSON.stringify(req.body);

  const options = {
    hostname: 'api.web3forms.com',
    port: 443,
    path: '/submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Accept': 'application/json'
    }
  };

  const postReq = https.request(options, (postRes) => {
    let responseBody = '';

    postRes.on('data', (chunk) => {
      responseBody += chunk;
    });

    postRes.on('end', () => {
      try {
        const result = JSON.parse(responseBody);
        res.status(postRes.statusCode).json(result);
      } catch (e) {
        res.status(500).json({ success: false, message: 'Failed to parse response from mail server' });
      }
    });
  });

  postReq.on('error', (error) => {
    console.error('Mail Proxy Error:', error);
    res.status(500).json({ success: false, message: 'Mail server connection failed', error: error.message });
  });

  postReq.write(data);
  postReq.end();
}
