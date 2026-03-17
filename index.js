const dns = require('dns2');
const net = require('net');

const { Packet } = dns;
const PORT_DNS = 53; // Puerto DNS estándar
const PORT_PROXY = 42124; // El puerto que usa el FIFA
const RAILWAY_IP = process.env.RAILWAY_PUBLIC_IP || '66.33.22.235'; // Tu IP de Railway

// 1. SERVIDOR DNS (Para decirle a la PS3 a dónde ir)
const dnsServer = dns.createServer({
  udp: true,
  handle: (request, send, rinfo) => {
    const response = Packet.createResponseFromRequest(request);
    const [question] = request.questions;
    const { name } = question;

    if (name.includes('gosredirector.ea.com')) {
      console.log(`Interceptando consulta DNS para: ${name}`);
      response.answers.push({
        name,
        type: Packet.TYPE.A,
        class: Packet.CLASS.IN,
        ttl: 300,
        address: RAILWAY_IP
      });
    }
    send(response);
  }
});

dnsServer.listen(PORT_DNS);

// 2. SERVIDOR PROXY (El que ya tenías para el FIFA)
const proxyServer = net.createServer((socket) => {
    console.log('¡PS3 conectada al Redirector!');
    socket.once('data', (data) => {
        const response = Buffer.from([
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ]);
        socket.write(response);
    });
});

proxyServer.listen(PORT_PROXY, '0.0.0.0', () => {
    console.log(`Servidores activos. DNS en 53 y Proxy en ${PORT_PROXY}`);
});
