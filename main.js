async function registerUser(username, password) {
    const response = await fetch('https://your-app.vercel.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    console.log(data.message);
}
