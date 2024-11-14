const Car = require('../models/Car');

exports.createCar = async (req, res) => {
    const car = new Car({ ...req.body, userId: req.user.id });
    await car.save();
    res.status(201).json(car);
};

exports.getCars = async (req, res) => {
    const cars = await Car.find({ userId: req.user.id });
    res.json(cars);
};

exports.getCarById = async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car || car.userId.toString() !== req.user.id) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
};

exports.updateCar = async (req, res) => {
    const car = await Car.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
    );
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
};

exports.deleteCar = async (req, res) => {
    const car = await Car.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted' });
};