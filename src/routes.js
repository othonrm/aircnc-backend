const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();

const upload = multer(uploadConfig);

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello Omnistack!' });
});

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;

// const Booking = require('./models/Booking');
// async function deleteBookings () {
//     console.log("Deleting bookings");

//     await Booking.deleteMany({});

//     let bookings = await Booking.find({});

//     console.log(bookings);
// }
// deleteBookings();

// console.log("End of file");
