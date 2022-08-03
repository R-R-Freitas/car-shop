import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

/*
  pt-br:
    O método zod enum() permite que limitemos os valores
    aceitos para um campo aos listados em um array de strings
    passado a ele como parâmetro. O uso de 'as const' na
    declaração do array o torna uma tupla somente leitura.
  en:
    The zod method enum() allows us to limit the values
    accepted by a field to the ones listed in an array of
    strings passed to it as a parameter. The use of 'as const'
    when declaring the array, turns it into a redonly tuple.
*/

// sources: https://github.com/colinhacks/zod#zod-enums
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
const categories = ['Street', 'Custom', 'Trail'] as const;

const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(categories),
  engineCapacity: z.number().int().lte(2500).positive(),
});

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export { IMotorcycle, MotorcycleZodSchema };
