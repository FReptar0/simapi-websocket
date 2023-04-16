// server/models/record.js

const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    // Tus campos aquí...
    estadoAlarma: {
        type: Boolean,
        required: true,
    },
    // ...
});

// Middleware para monitorear las actualizaciones de registros
recordSchema.pre('findOneAndUpdate', async function () {
    // Obtener el documento actual antes de la actualización
    this._currentDocument = await this.findOne();
});

recordSchema.post('findOneAndUpdate', function (doc) {
    const currentEstadoAlarma = this._currentDocument.estadoAlarma;
    const updatedEstadoAlarma = doc.estadoAlarma;

    // Verificar si el campo 'estadoAlarma' ha cambiado de 'false' a 'true'
    if (currentEstadoAlarma === false && updatedEstadoAlarma === true) {
        // Emitir el evento 'record_updated' con el documento actualizado
        const io = require('socket.io').getInstance();
        io.emit('record_updated', doc);
    }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
