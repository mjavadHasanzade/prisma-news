import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const userId = req.query.id;
  if (req.method === "DELETE") {
    const post = await prisma.news.delete({
      where: { id: userId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
