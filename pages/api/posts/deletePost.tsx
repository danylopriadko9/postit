import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ message: 'Please sign in to delete the post.' });
  }

  if (req.method === 'POST') {
    const { id } = req.body;

    if (!id) return res.status(404).json({ message: 'Post not found' });

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    console.log(prismaUser.id);

    // Delete the post
    try {
      const result = await prisma.post.deleteMany({
        where: {
          id: id,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      return res.status(403).json({
        message: 'An error occurred while removing the post',
        error: error,
      });
    }
  }
}
