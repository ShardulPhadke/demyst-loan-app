import { Schema, model, models } from 'mongoose';

const nameSchema = new Schema({
    Name: String,
    Address: String,
    City: String
});

const Name = models.Name || model("Name", nameSchema, 'test');

export default Name;