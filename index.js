const net = require('net');

// El FIFA 15 busca el Redirector en el puerto 42124
const PORT = process.env.PORT || 42124;

const server = net.createServer((socket) => {
    console.log('--- ¡Conexión detectada desde la PS3! ---');

    socket.on('data', (data) => {
        // Log para ver qué está pidiendo la PS3
        console.log('Datos recibidos:', data.toString('hex'));

        // RESPUESTA DE BYPASS: 
        // Este paquete le dice al FIFA: "El servidor está activo, usá esta misma IP"
        const response = Buffer.from([
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ]);

        socket.write(response);
        console.log('Respuesta de Bypass enviada.');
    });

    socket.on('error', (err) => {
        console.log('Error en el socket:', err.message);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor de Bypass FIFA activo en puerto ${PORT}`);
});
