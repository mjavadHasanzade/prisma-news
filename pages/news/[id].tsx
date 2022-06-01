import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import prisma from "../../lib/prisma";
import Router from "next/router";
import Seo from "../seo";

interface IHomepage {
  news: any;
}

const EditUser: NextPage<IHomepage> = ({ news }) => {
  const [name, setName] = useState<string>(JSON.parse(news).title);
  const [branch, setBranch] = useState<string>(JSON.parse(news).branch);
  const [description, setDescription] = useState<string>(
    JSON.parse(news).description
  );

  const submitData = async (e: React.SyntheticEvent, id) => {
    e.preventDefault();
    try {
      const body = { name, branch, description };
      await fetch("/api/edit/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Seo title={`Edit ${name}`} />

      <div className="page">
        <form onSubmit={(e) => submitData(e, JSON.parse(news).id)}>
          <h1>Edit {name}</h1>

          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Title"
            type="text"
            value={name}
            className="form-control my-4"
          />
          <input
            autoFocus
            onChange={(e) => setBranch(e.target.value)}
            placeholder="branch"
            type="text"
            value={branch}
            className="form-control my-4"
          />

          <textarea
            name=""
            id=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols={30}
            rows={10}
            className="form-control my-4"
          ></textarea>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const news = await prisma.news.findUnique({ where: { id: ctx.params.id } });
  return { props: { news: JSON.stringify(news) } };
};
