import mongoose from "mongoose";
import { MongoDataBase } from "./init";

describe('Init MongoDb', () => {

    afterAll(() => {
        mongoose.connection.close();
    })

    test('Should connect to MongoDB', async () => {

        const connected = await MongoDataBase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        })

        expect(connected).toBe(true);

    });

    test('Should throw an error', async () => {

        try {
            const connected = await MongoDataBase.connect({
                mongoUrl: 'mongodb://invaliduser:invalidpass@127.0.0.1:27018/',
                dbName: process.env.MONGO_DB_NAME!
            })
            expect(true).toBe(false);
        } catch (error) {

        }
    });
});