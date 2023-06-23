const Subscriber = require('../models/subscriber.model');


exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    console.error('Failed to get subscribers:', error);
    res.status(500).json({ error: 'Failed to get subscribers' });
  }
};


exports.createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Subscription successful', subscriber: newSubscriber });
  } catch (error) {
    console.error('Failed to subscribe:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
};


exports.updateSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const updatedSubscriber = await Subscriber.findByIdAndUpdate(id, { email }, { new: true });
    if (!updatedSubscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    res.status(200).json({ message: 'Subscriber updated successfully', subscriber: updatedSubscriber });
  } catch (error) {
    console.error('Failed to update subscriber:', error);
    res.status(500).json({ error: 'Failed to update subscriber' });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubscriber = await Subscriber.findByIdAndDelete(id);
    if (!deletedSubscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    res.status(200).json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Failed to delete subscriber:', error);
    res.status(500).json({ error: 'Failed to delete subscriber' });
  }
};
