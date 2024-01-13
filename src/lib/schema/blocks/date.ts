import { z } from "zod";

const blockType = z.literal("date");

export const dateBlockSchema = z.object({
	type: blockType,
	required: z.boolean(),
	title: z.string(),
});
export type DateBlock = z.infer<typeof dateBlockSchema>;

export const dateBlockValueSchema = z.object({
	type: blockType,
	value: z.date(),
});
export type DateBlockValue = z.infer<typeof dateBlockValueSchema>;
