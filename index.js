const net = require('net');
const mongoose = require('mongoose');

// Railway te da esta variable automáticamente si conectaste el servicio
const mongoURI = process.env.MONGODB_URL || process.env.MONGO_URL;

if (mongoURI) {
    mongoose.connect(mongoURI)
        .then(() => console.log("[+] Base de Datos conectada"))
        .catch(err => console.error("[!] Error DB:", err));
}

const PORT = process.env.PORT || 42124;

const server = net.createServer((socket) => {
    console.log('[+] FIFA intentando conectar...');
    const response = Buffer.from("000000010000000000000000", "hex");
    socket.write(response);
    socket.end(); 
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`[*] Servidor escuchando en puerto ${PORT}`);
});
