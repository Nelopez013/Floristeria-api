import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    flores: [{
        flor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flor',
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Confirmado', 'Entregado', 'Cancelado'],
        default: 'Pendiente'
    }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;
