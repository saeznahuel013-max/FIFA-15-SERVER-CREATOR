const net = require('net');

const TARGET_IP = '66.33.22.1'; // Aquí irá la IP de tu servidor de juego
const PORT = process.env.PORT || 42124;

const server = net.createServer((socket) => {
    console.log('PS3 conectada al Redirector!');
    
    socket.once('data', (data) => {
        // Respuesta mágica que engaña a la PS3
        const response = Buffer.from([
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ]);
        socket.write(response);
    });

    socket.on('error', (err) => console.log('Error:', err.message));
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Redirector FIFA activo en puerto ${PORT}`);
});
