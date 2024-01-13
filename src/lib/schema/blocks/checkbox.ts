import { z } from "zod";

const blockType = z.literal("checkbox");
const optionSchema = z.object({
	value: z.string(),
	label: z.string(),
});

export const checkboxBlockSchema = z.object({
	type: blockType,
	required: z.boolean(),
	title: z.string(),
	options: z.array(optionSchema),
});
export type CheckboxBlock = z.infer<typeof checkboxBlockSchema>;

export const checkboxBlockValueSchema = z.object({
	type: blockType,
	value: z.array(z.string()),
});
export type CheckboxBlockValue = z.infer<typeof checkboxBlockValueSchema>;
