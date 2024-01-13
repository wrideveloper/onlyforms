import { z } from "zod";

const blockType = z.literal("time");

export const timeBlockSchema = z.object({
	type: blockType,
	required: z.boolean(),
	title: z.string(),
});
export type TimeBlock = z.infer<typeof timeBlockSchema>;

export const timeBlockValueSchema = z.object({
	type: blockType,
	value: z.date(),
});
export type TimeBlockValue = z.infer<typeof timeBlockValueSchema>;
