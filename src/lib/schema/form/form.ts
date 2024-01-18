import { z } from "zod";
import { ObjectId } from "mongodb";
import {
	checkboxBlockSchema,
	dateBlockSchema,
	linearScaleBlockSchema,
	paragraphBlockSchema,
	radioBlockSchema, selectBlockSchema, textBlockSchema, timeBlockSchema
} from "$lib/schema/form/blocks";

export const formSchema = z.object({
	_id: z.instanceof(ObjectId),
	coverImage: z.string().url().nullable().default(null),
	title: z.string().min(4).max(255).trim(),
	description: z.string(),
	enabled: z.boolean(),
	inactiveMessage: z.string().default("This form no longer receives responses."),
	endPage: z.object({
		title: z.string().min(4).max(255).trim().default("Thanks for filling out the form!"),
		description: z.string().default("Your response has been recorded."),
		button: z.object({
			enabled: z.boolean().default(true),
			link: z.string().url().nullable().default(null),
			text: z.string().default("Submit another response")
		})
	}),
	validUntil: z.date().nullable().default(null),
	status: z.enum(["draft", "published"]),
	submissionLimit: z.number().int().min(0).nullable().default(null),
	blocks: z.array(z.discriminatedUnion("type", [
		dateBlockSchema,
		checkboxBlockSchema,
		linearScaleBlockSchema,
		paragraphBlockSchema,
		radioBlockSchema,
		selectBlockSchema,
		textBlockSchema,
		timeBlockSchema
	])),
	createdAt: z.date(),
	updatedAt: z.date()
});
export type FormSchema = z.infer<typeof formSchema>;