import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { name, branch, description } = req.body;

  const result = await prisma.news.create({
    data: {
      title: name,
      branch: branch,
      description: description,
    },
  });
  res.json(result);
}
