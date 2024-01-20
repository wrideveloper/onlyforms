import { z } from "zod";

const blockType = z.literal("linear-scale");

export const linearScaleBlockSchema = z.object({
	type: blockType,
	required: z.boolean(),
	title: z.string(),
	min: z.object({
		label: z.string().optional(),
		value: z.number(),
	}),
	max: z.object({
		label: z.string().optional(),
		value: z.number(),
	}),
});
export type LinearScaleBlock = z.infer<typeof linearScaleBlockSchema>;

export const linearScaleBlockValueSchema = z.object({
	type: blockType,
	value: z.number(),
});
export type LinearScaleBlockValue = z.infer<typeof linearScaleBlockValueSchema>;
