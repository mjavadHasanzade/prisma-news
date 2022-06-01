import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import prisma from "../lib/prisma";
import Router from "next/router";
import Seo from "./seo";

interface IHomepage {
  users: any;
}

const Create: NextPage<IHomepage> = ({}) => {
  const [name, setName] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, branch,description };
      await fetch("/api/post", {
        method: "POST",
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
     <Seo title="New News" />

      <div className="page">
        <form onSubmit={submitData}>
          <h1>New News</h1>

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
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
