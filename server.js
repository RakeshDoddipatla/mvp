const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/apparel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const apparelSchema = new mongoose.Schema({
    item: String,
    condition: String,
    description: String,
});

const Apparel = mongoose.model('Apparel', apparelSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../app'));

app.post('/api/apparel', (req, res) => {
    const { item, condition, description } = req.body;

    const newApparel = new Apparel({ item, condition, description });

    newApparel.save()
        .then(() => {
            res.json({ message: 'Item submitted successfully!' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error saving item.' });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
