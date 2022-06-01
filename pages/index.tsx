import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import prisma from "../lib/prisma";
import Seo from "./seo";

interface IHomepage {
  news: any;
}

const Home: NextPage<IHomepage> = ({ news: propsNews }) => {
  const handleDelete = async (id: string) => {
    await fetch(`/api/del-news/${id}`, {
      method: "DELETE",
    });
    Router.push("/");
  };

  const news = JSON.parse(propsNews);
  return (
    <div>
      <Seo title="News" />

      <div className="page">
        <h1 className="mb-4">News </h1>
        <div className="actions border-bottom pb-4">
          <Link href="/addNews">
            <button className="btn btn-success">add news</button>
          </Link>
        </div>

        {news.map((item) => (
          <div key={item.id} className="user-item">
            <strong>{item.title}</strong>

            <span>{item.branch}</span>
            <span>{item.description}</span>
            <span className="actions">
              <Link href={`/news/${item.id}`}>
                <button className="btn btn-info">Edit</button>
              </Link>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const news = await prisma.news.findMany();
  return { props: { news: JSON.stringify(news) } };
};
