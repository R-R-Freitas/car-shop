import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

// source: https://github.com/colinhacks/zod#native-enums
const categories = ['Street', 'Custom', 'Trail'] as const;

const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(categories),
  engineCapacity: z.number().int().lte(2500).positive(),
});

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>; 

export { IMotorcycle, MotorcycleZodSchema };
