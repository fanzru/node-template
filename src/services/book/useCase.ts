
import { Mongoose } from "mongoose"
import { Book } from "../../infrastructure/database"
// import Book from './model';
export class BookUsecase {
    db: Mongoose
    constructor(
        db: Mongoose
    ) {
        this.db = db
    }

     createBook = async (title: string, year: Number)  : Promise<boolean>  =>  {
        try {
          
            const book = new Book({title: title, year: year})
            book.save();
            return true
        } catch (e){
            console.log(e)   
            return false
        }
        
    }

}