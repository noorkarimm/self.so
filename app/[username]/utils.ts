import { getResume, getUserIdByUsername } from '@/lib/server/redisActions';
import { clerkClient } from '@clerk/nextjs/server';
import { unstable_cache } from 'next/cache';

// Initialize clerkClient outside of the cache function
const clerk = clerkClient;

export async function getUserData(username: string) {
  const user_id = await getUserIdByUsername(username);
  if (!user_id)
    return { user_id: undefined, resume: undefined, clerkUser: undefined };

  const resume = await getResume(user_id);
  if (!resume?.resumeData || resume.status !== 'live') {
    return { user_id, resume: undefined, clerkUser: undefined };
  }

  const getCachedUser = unstable_cache(
    async () => {
      return await clerk.users.getUser(user_id);
    },
    [user_id],
    {
      tags: ['users'],
      revalidate: 60, // 1 minute in seconds
    }
  );
  const clerkUser = await getCachedUser();

  return { user_id, resume, clerkUser };
}