import { Mongoose, Schema, Document, Model } from 'mongoose'

import mongoose from "mongoose"


export interface IBook extends Document {
    id: string;
    title: string;
    year: number;
}
const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    year: { type: Number, required: true },
});

const BookModel: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

const InitDBClient = async (): Promise<Mongoose> => {
    console.log("connecting to database .....")

    mongoose.connect('mongodb://127.0.0.1:27017/gigih')
        .then(() => console.log('Connection try succeed!'))
        .catch((e) => console.log(`mampus error ${e}`));


    return mongoose
}

export { InitDBClient, BookModel as Book };