// server/index.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Escuchar conexiones de clientes
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Desconectar al cliente
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

// Crear la ruta API para activar
app.get('/api/send-message/activate/:idEnfermera/:Nombre', (req, res) => {
    const idEnfermera = req.params.idEnfermera;
    const nombre = req.params.Nombre;

    // Emitir el evento 'record_updated' a los clientes conectados con el mensaje "Activate"
    io.emit('record_updated', "El paciente " + nombre + " ha activado la alarma @"+idEnfermera);

    res.status(200).json({ message: 'Activación enviada a los clientes suscritos' });
});

// Crear la ruta API para desactivar
app.get('/api/send-message/deactivate/:idEnfermera/:Nombre', (req, res) => {
    const idEnfermera = req.params.idEnfermera;
    const nombre = req.params.Nombre;

    // Emitir el evento 'record_updated' a los clientes conectados con el mensaje "Deactivate"
    io.emit('record_updated', "El paciente " + nombre + " ha sido desactivado por la enfermera " + idEnfermera);

    res.status(200).json({ message: 'Desactivación enviada a los clientes suscritos' });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
