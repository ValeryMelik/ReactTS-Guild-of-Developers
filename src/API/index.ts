import z from 'zod';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

const STask = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export type TTask = z.infer<typeof STask>;

