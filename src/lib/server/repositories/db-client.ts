import { MongoClient } from "mongodb";
import { MONGO_DB, MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USERNAME } from "$env/static/private";

let connectionUri = "";
if (MONGO_HOST === "localhost") {
	connectionUri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?retryWrites=true&w=majority&authSource=admin`;
} else {
	connectionUri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority&authSource=admin`;
}

export const dbClient = new MongoClient(connectionUri);