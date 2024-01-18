import { formSchema, type FormSchema } from "$lib/schema/form";
import { dbClient } from "$lib/server/repositories/db-client";
import { MONGO_DB } from "$env/static/private";
import { ObjectId } from "mongodb";

export const FORM_COLLECTION_NAME = "forms";

export async function getFormSchemaById(id: string): Promise<FormSchema | null> {
	const form = await dbClient.db(MONGO_DB).collection(FORM_COLLECTION_NAME).findOne({
		_id: ObjectId.createFromHexString(id)
	});
	if (form === null) return null;
	return formSchema.parse(form);
}