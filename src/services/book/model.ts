import { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  year: string;
}

const BookSchema = new Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
});

export default model<IBook>('Book', BookSchema);