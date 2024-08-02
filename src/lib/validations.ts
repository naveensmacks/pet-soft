import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petIdSchema = z.string().cuid();

//.trim(), .coerce(), .transform() wont work for action,
//it will work only for onSubmit in form
export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name can't be longer than 100 characters" }),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(100, { message: "Owner name can't be longer than 100 characters" }),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Please enter a valid image URL" }),
    ]),
    age: z.coerce
      .number()
      .int()
      .min(1, { message: "Age is required" })
      .max(9999),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;
