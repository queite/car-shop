import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'EngineCapacity is required',
    invalid_type_error: 'EngineCapacity must be a number',
  }).int().gt(0).lte(2500),
});

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export { MotorcycleZodSchema, IMotorcycle };