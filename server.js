const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const moment = require('moment-timezone');

// Middleware untuk menangani data formulir
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Menangani permintaan POST dari formulir
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Membuat objek pesan baru dengan waktu pengiriman
    const newMessage = {
        name: name,
        email: email,
        message: message,
        timestamp: moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') // Menyimpan timestamp dalam format ISO
    };

    // Membaca file messages.json untuk mengambil pesan-pesan yang sudah ada
    fs.readFile('messages.json', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Jika file tidak ada, buat file baru dan simpan pesan pertama
                const messages = [newMessage];
                fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing file', err);
                        return res.status(500).send('Failed to save your message.');
                    }
                    res.send('Thank you for your message!');
                });
            } else {
                console.error('Error reading file', err);
                return res.status(500).send('Failed to save your message.');
            }
        } else {
            let messages = [];
            try {
                // Pastikan data JSON tidak kosong dan valid
                if (data.length > 0) {
                    messages = JSON.parse(data);
                }
            } catch (err) {
                console.error('Error parsing JSON data:', err);
                return res.status(500).send('Failed to parse existing messages.');
            }

            // Menambahkan pesan baru ke array
            messages.push(newMessage);

            // Menulis kembali data ke file messages.json
            fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file', err);
                    return res.status(500).send('Failed to save your message.');
                }
                res.send('Thank you for your message!');
            });
        }
    });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
