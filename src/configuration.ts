import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret:'mysecret', // Set this in your environment variables
}));