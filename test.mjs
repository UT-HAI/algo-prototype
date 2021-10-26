import fetch from "node-fetch";

fetch('http://127.0.0.1:3000/api/selection', {
    method: 'POST',
    body: JSON.stringify({ foo: 'bar' }),
    headers: { 'Content-Type': 'application/json' }
}).then(res => {
    if (!res.ok){
        res.text().then(msg => console.log(msg))
    }
})
.catch(e => console.log(e))