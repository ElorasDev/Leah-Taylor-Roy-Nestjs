import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export const L_J_JWT = process.env.JWT_SECRET;
