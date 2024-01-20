import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { FORM_COLLECTION_NAME, getFormSchemaById } from "$lib/server/repositories/form-repository";
import { dbClient } from "$lib/server/repositories/db-client";
import type { FormSchema, TextBlock } from "$lib/schema/form";
import { ObjectId } from "mongodb";

const DB_NAME = "onlyforms-test";

describe("form-repository", () => {
	const objectId = ObjectId.createFromHexString("fb57f193091e6e59c462741d");
	beforeAll(async () => {
		vi.mock("$env/static/private", async (importOriginal) => {
			const original = await importOriginal() as Record<string, string>;
			return {
				...original,
				MONGO_DB: "onlyforms-form-test"
			};
		});

		// insert data into database
		await dbClient.db(DB_NAME).collection(FORM_COLLECTION_NAME).insertMany([
			{
				_id: objectId,
				title: "Test Form",
				coverImage: null,
				description: "This is a test form.",
				enabled: true,
				inactiveMessage: "This form no longer receives responses.",
				endPage: {
					title: "Thanks for filling out the form!",
					description: "Your response has been recorded.",
					button: {
						enabled: true,
						link: null,
						text: "Submit another response"
					}
				},
				validUntil: null,
				submissionLimit: null,
				status: "published",
				blocks: [
					{
						type: "text",
						title: "Text",
						placeholder: "Enter text here...",
						required: true
					}
				],
				createdAt: new Date(),
				updatedAt: new Date()
			}
		] satisfies FormSchema[]);
	});

	afterAll(async () => {
		await dbClient.db(DB_NAME).dropDatabase();
	});

	it("should return null when form is not found", async () => {
		const form = await getFormSchemaById("000000000000000000000000");
		expect(form).toBeNull();
	});

	it("should get form schema by id containing text input field", async () => {
		const form = await getFormSchemaById(objectId.toString());
		expect(form).toBeDefined();
		expect(form?.title).toBe("Test Form");
		expect(form?.description).toBe("This is a test form.");
		expect(form?.enabled).toBe(true);
		expect(form?.inactiveMessage).toBe("This form no longer receives responses.");
		expect(form?.endPage.title).toBe("Thanks for filling out the form!");
		expect(form?.endPage.description).toBe("Your response has been recorded.");
		expect(form?.endPage.button.enabled).toBe(true);
		expect(form?.endPage.button.link).toBeNull();
		expect(form?.endPage.button.text).toBe("Submit another response");
		expect(form?.status).toBe("published");
		expect(form?.submissionLimit).toBeNull();
		expect(form?.blocks).toHaveLength(1);
		expect(form?.blocks[0].type).toBe("text");
		expect(form?.blocks[0].title).toBe("Text");
		expect((form?.blocks[0] as TextBlock).placeholder).toBe("Enter text here...");
		expect(form?.blocks[0].required).toBe(true);
		expect(form?.createdAt).toBeInstanceOf(Date);
		expect(form?.updatedAt).toBeInstanceOf(Date);
	});
});