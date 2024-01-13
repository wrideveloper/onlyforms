import { z } from "zod";

const blockType = z.literal("radio");
const optionSchema = z.object({
	value: z.string(),
	label: z.string(),
});

export const radioBlockSchema = z.object({
	type: blockType,
	required: z.boolean(),
	title: z.string(),
	options: z.array(optionSchema),
});
export type RadioBlock = z.infer<typeof radioBlockSchema>;

export const radioBlockValueSchema = z.object({
	type: blockType,
	value: z.string(),
});
export type RadioBlockValue = z.infer<typeof radioBlockValueSchema>;
