import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout/layout";

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Mobile Safari/537.36 Edg/101.0.1210.53",
    },
  });
  const news = await res.json();

  return {
    props: {
      news,
    },
    revalidate: 8000000,
  };
}

export default function Home(props) {
  return (
    <Layout>
      <Head>
        <title>News</title>
        <meta name="description" content=":)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {props.news.map((neww) => (
        <section key={neww.id} className="mt-2 mb-4">
          <div>
            <Link href={neww.url}>
              <a>
                <span>{neww.title} </span>
                <span>({neww.domain})</span>
              </a>
            </Link>
          </div>

          <div>
            <span className="text-gray-400 text-sm">{neww.points} points </span>
            <span className="text-gray-400 text-sm">by {neww.user} </span>
            <span className="text-gray-400 text-sm">{neww.time_ago} | </span>

            <Link href={"/news/" + neww.id}>
              <span className="text-gray-400 text-sm cursor-pointer">
                {neww.comments_count} comments
              </span>
            </Link>
          </div>
        </section>
      ))}
    </Layout>
  );
}
