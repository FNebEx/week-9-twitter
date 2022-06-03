export const getTweets = async (prisma) => {
  return await prisma.tweet.findMany({
    where: {},
    orderBy: [
      { id: 'desc' }
    ],
    include: { author: true }
  });
}

export const getTweet = async (id, prisma) => {
  const tweet = await prisma.tweet.findUnique({
    where: { id: parseInt(id) },
    include: { author: true }
  });

  return tweet
}