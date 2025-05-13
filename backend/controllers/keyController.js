const Key = require('../models/Key');
const { encrypt, decrypt } = require('../utils/cryptoUtils');

const createKey = async (req, res) => {
  const { name, appId, value, environment, expiresAt, tags } = req.body;
  const encrypted = encrypt(value);
  const key = await Key.create({
    userId: req.user.id,
    name,
    appId,
    value: encrypted,
    environment,
    expiresAt,
    tags
  });
  res.status(201).json({ id: key._id });
};

const listKeys = async (req, res) => {
  const keys = await Key.find({ userId: req.user.id });
  res.json(keys.map(k => ({ ...k.toObject(), value: undefined })));
};

const getKey = async (req, res) => {
  const key = await Key.findOne({ _id: req.params.id, userId: req.user.id });
  if (!key) return res.status(404).json({ message: 'Key not found' });
  res.json({ ...key.toObject(), value: decrypt(key.value) });
};

module.exports = { createKey, listKeys, getKey };
