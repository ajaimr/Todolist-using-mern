const express = require('express');
const app = express();
const Model = require('./model.js');
const cors = require('cors');

app.use(express.json()); // Middleware to parse JSON in the request body
app.use(cors());
app.delete('/deleteAll', async (req, res) => {
    try {
        // Delete all documents from the collection
        await Model.deleteMany({});
        res.json({ status: "ok", message: "All data deleted successfully" });
    } catch (error) {
        console.error("Error deleting all data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.delete('/dsubmit', async (req, res) => {
    try {
        const id = req.body.id;
        // Delete the task from the database
        const deletedTask = await Model.findOneAndDelete({id:id}).then(()=>{
            console.log('success');
        })
        .catch(()=>{
            console.log('error');
        })
    } catch (error) {
        // Handle errors
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post('/submit', async (req, res) => {
    try {
        const name = req.body.name;
        const id=req.body.id;
        const newTask = new Model({
            name: name,
            id:id
        });

        await newTask.save();

        res.json({ status: "ok" });
    } catch (error) {
        console.error("Error saving task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(4000, () => {
    console.log('server is listening');
});
