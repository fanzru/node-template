import { ExpressServer } from './infrastructure/http';
import { InitDBClient } from './infrastructure/database';
import { BookHTTPConnector } from "./services/book/http";
import { BookUsecase } from "./services/book/useCase";
import mongoose from 'mongoose';

const main = async () => {

    // Init database
    const dbClient = await InitDBClient();

    dbClient.connection
        .on("open", () => console.log("mongoose is connected"))
        .on("close", () => console.log("mongoose is disconnected"))
        .on("error", (error) => console.log(error))

    // Init server
    const express = new ExpressServer();

    // register book domain
    const bookUsecase = new BookUsecase(dbClient);
    const bookHTTPConnector = new BookHTTPConnector(bookUsecase);

    express.registerRouter(bookHTTPConnector.getRouter())

    express.start();
}

main();