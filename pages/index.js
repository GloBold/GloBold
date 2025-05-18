import { useState } from 'react';

export default function Home() {
  const [businessName, setBusinessName] = useState('');
  const [offer, setOffer] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail('');
    setError('');

    try {
      const response = await fetch('/api/secure-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer GLO_SECURE_X92k3mL7pQa8zT19vRb'
        },
        body: JSON.stringify({ businessName, offer })
      });

      const data = await response.json();
      if (response.ok) {
        setEmail(data.email);
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      setError('Request failed');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>GloBold AI Cold Email Generator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="text"
          placeholder="Your Offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: 10 }}>Generate Email</button>
      </form>

      {email && (
        <div style={{ marginTop: 20 }}>
          <h3>Generated Email:</h3>
          <pre style={{ background: '#eee', padding: 10 }}>{email}</pre>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: 20 }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
} 