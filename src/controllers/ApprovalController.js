const Booking = require('./../models/Booking');

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = true;

        await booking.save();

        // Procurando pelo socket de conexao do user dono do spot que esta recebendo o booking
        const bookingUserSocket = req.connectedUsers[booking.user];

        if (bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
}
