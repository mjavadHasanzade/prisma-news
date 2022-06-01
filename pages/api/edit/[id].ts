import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const userId = req.query.id;
  const user = await prisma.news.update({
    where: { id: userId },
    data: {
      title: req.body.name,
      branch: req.body.branch,
      description: req.body.description,
    },
  });
  res.json(user);
}
