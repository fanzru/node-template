
import { HTTPConnector } from '../../types/http';
import { BookUsecase } from './useCase';
import bodyParser from 'body-parser';
import { Request, Response, Router } from 'express';

export class BookHTTPConnector implements HTTPConnector {
    usecase: BookUsecase;
    router: Router;

    constructor(usecase: BookUsecase) {
        this.usecase = usecase;
        this.router = Router();
        this.registerRoutes();
    }

    // for regist handler / controller 
    registerRoutes = () => {
        this.router.post(
            "/book",
            this.createBook
        )

        this.router.get(
            "/book",
            this.getBook
        )
    }
    // for server excute
    getRouter = () => {
        return this.router;
    }

    // for handler 
    createBook = async (req: Request, res: Response) => {
        console.log("masuk woi")
        try {
            if ((req.body.title === undefined) || (req.body.year === undefined)) {
                return res.status(400).send({
                    status: false,
                    code: 400,
                    message: "BODY_ERROR"
                });
            }
            const value = await this.usecase.createBook(req.body.title, req.body.year)
            if (!value) {
                return res.status(400).send({
                    status: false,
                    code: 400,
                    message: "USECASE_ERROR"
                });
            }

            return res.status(200).send({
                    status: true,
                    code: 200,
                    message: "SUCCESS"
                });
        } catch {
            return res.status(500).send("internal server erro");
        }
    }

    getBook = async (req: Request, res: Response) => {
        return res.status(200).send("success").end();
    }

}