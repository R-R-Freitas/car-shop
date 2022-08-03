import { z } from 'zod';

/*
  pt-br:
    Com o  método zod object() atribuimos o tipo objeto ao,
    schema e, dentro dele, definimos os nomes, tipos e outras
    caracteristicas dos campos.
  en:
    The zod method object() we assign the type object to
    the schema, and in it, we list the names, types and other
    characteristics of the fiels.
*/
const VehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

/*
  pt-br:
    O infer do zod permite-nos extrair o tipo de um schema
    e atribuí-lo a um novo tipo.
  en:
    Zod infer allows us to extract the type of a schema
    and assign it to a new type.
*/

type IVehicle = z.infer<typeof VehicleZodSchema>;

export { IVehicle, VehicleZodSchema };