import { z } from "zod";

const blockType = z.literal("text");

export const textBlockSchema = z.object({
	type: blockType,
	required: z.boolean(),
	title: z.string(),
	placeholder: z.string(),
});
export type TextBlock = z.infer<typeof textBlockSchema>;

export const textBlockValueSchema = z.object({
	type: blockType,
	value: z.string(),
});
export type TextBlockValue = z.infer<typeof textBlockValueSchema>;
