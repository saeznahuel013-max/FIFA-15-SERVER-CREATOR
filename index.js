const net = require('net');

const PORT = process.env.PORT || 42124;

const server = net.createServer((socket) => {
    console.log('[+] Conexión recibida del iPad/PS3');

    // Respuesta binaria para bypass de Origin
    const response = Buffer.from("000000010000000000000000", "hex");
    
    socket.write(response);
    console.log('[v] Respuesta de bypass enviada.');

    socket.on('error', (err) => {
        console.log('[!] Error: ' + err.message);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`[*] Servidor FIFA activo en puerto ${PORT}`);
});
