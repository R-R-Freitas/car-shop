import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

/*
pt-br:
  O método .extend() do zod permite que o schema receba outro
  por atribuição, adicionando novos campos. Assim, podemos
  estabalecer herança entre os tipos/interfaces que utilizam
  os referidos schemas em suas declarações.
en:
  The zod method .extend() allows a schema to receive another
  one through assignment, adding new fields. That way, we can
  stablish inheritance between the types/interfaces that use
  them in their declarations.
*/

// source: https://github.com/colinhacks/zod#extend
const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type ICar = z.infer<typeof CarZodSchema>; 

export { ICar, CarZodSchema };
