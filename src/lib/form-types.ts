import type { z } from "zod";

export type ActionFormState<T extends z.ZodType<any, any, any>> = {
  success?: boolean;
  message?: string;
  errors?: z.typeToFlattenedError<z.infer<T>>["fieldErrors"];
};
