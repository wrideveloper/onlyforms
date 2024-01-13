import { z } from "zod";

const blockType = z.literal("select");
const optionSchema = z.object({
	value: z.string(),
	label: z.string(),
});

export const selectBlockSchema = z.object({
	type: blockType,
	required: z.boolean(),
	title: z.string(),
	options: z.array(optionSchema),
});
export type SelectBlock = z.infer<typeof selectBlockSchema>;

export const selectBlockValueSchema = z.object({
	type: blockType,
	value: z.string(),
});
export type SelectBlockValue = z.infer<typeof selectBlockValueSchema>;
