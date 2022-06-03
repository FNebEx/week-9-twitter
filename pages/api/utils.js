import { faker } from "@faker-js/faker";
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method !== 'POST') return res.end();

  if (req.body.task === 'clean_database') {
    await prisma.tweet.deleteMany({});
    await prisma.user.deleteMany({
      where: {
        NOT: {
          email: {
            in: [session.user.email]
          }
        }
      }
    });
  }
  
  if (req.body.task === 'generate_users_and_tweets') {
    for (let i = 0; i < 5; i++) {
      await prisma.user.create({
        data: {
          name: faker.internet.userName().toLocaleLowerCase(),
          email: faker.internet.email().toUpperCase(),
          image: faker.internet.avatar()
        }
      });
    }

    const users = await prisma.user.findMany({});

    users.forEach(async (user) => {
      await prisma.tweet.create({
        data: {
          content: faker.hacker.phrase(),
          author: {
            connect: { id: user.id }
          }
        }
      });
    });
  }

  if (req.body.task === 'generate_one_tweet') {
    const users = await prisma.user.findMany({});
    const randomidx = Math.floor(Math.random() * users.length);
    const user = users[randomidx];

    await prisma.tweet.create({
      data: {
        content: faker.hacker.phrase(),
        author: {
          connect: { id: user.id }
        }
      }
    });
  }

  res.end();
}