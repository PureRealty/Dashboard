export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt } = req.body;

        try {
            const response = await fetch('https://chatgpt.com/g/g-pUwmbu3Qu-purebot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GPT_API_KEY}`
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();

            if (response.ok) {
                res.status(200).json({ response: data.response });
            } else {
                res.status(500).json({ error: 'Error from GPT API', details: data });
            }
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
