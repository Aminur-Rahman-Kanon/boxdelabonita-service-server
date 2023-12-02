const https = require('https');

function cronJob () {
    setInterval(() => {
        https.get('https://boxdelabonita-server.onrender.com', (result) => {
            console.log('pinging...')
        })
    }, 840000);
}

module.exports = {
    cronJob
}