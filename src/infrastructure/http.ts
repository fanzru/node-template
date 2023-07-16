import express from 'express';
import { Express, Request, Response, Router } from 'express';
export class ExpressServer {
    app: Express;

    constructor() {
        this.app = express()

        // for other middleware on requiremen
        this.app.use(express.json({ type: "*/*" }))

        this.app.get("/", (req: Request, res: Response) => {
            return res.send("affan keren 200 OK")
        })
    }

    start = () => {
        const port = parseInt(process.env.APP_PORT ?? "3000")
        const host = process.env.APP_HOST ?? "0.0.0.0"

        this.app.listen(port, host, () => {
            console.log(`server running on ${host}:${port}`)
        })
    }


    registerRouter = (router: Router) => {
        this.app.use(router);
    }
}