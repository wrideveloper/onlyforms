import { z } from "zod";

const blockType = z.literal("paragraph");

export const paragraphBlockSchema = z.object({
	type: blockType,
	required: z.boolean(),
	title: z.string(),
	placeholder: z.string(),
});
export type ParagraphBlock = z.infer<typeof paragraphBlockSchema>;

export const paragraphBlockValueSchema = z.object({
	type: blockType,
	value: z.string(),
});
export type ParagraphBlockValue = z.infer<typeof paragraphBlockValueSchema>;
