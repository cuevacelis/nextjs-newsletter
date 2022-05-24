import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/item/${params.path}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Mobile Safari/537.36 Edg/101.0.1210.53",
      },
    }
  );
  const comments = await res.json();

  return {
    props: {
      comments,
    },
    revalidate: 8000000,
  };
}

function SubComments(props) {
  if (props.comments.length === 0) {
    return null;
  } else {
    return (
      <>
        {props.comments.map((comment) => (
          <section
            key={comment.id}
            className="border border-gray-500 mt-2 mb-6 py-2 px-4"
          >
            {ReactHtmlParser(comment?.content)}
            <span className="text-gray-400">{comment?.user} </span>
            <span className="text-gray-400">{comment?.time_ago}</span>
          </section>
        ))}
      </>
    );
  }
}

function Comments(props) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Cargando.......</p>;
  } else {
    return (
      <Layout>
        <section className="mt-2 mb-6">
          <h1>{props.comments.title}</h1>
        </section>

        {props.comments.comments.map((comment) => (
          <section
            key={comment.id}
            className="border border-orange-600 mb-6 p-2"
          >
            {ReactHtmlParser(comment?.content)}
            <span className="text-gray-400">{comment?.user} </span>
            <span className="text-gray-400">{comment?.time_ago}</span>
            <SubComments comments={comment.comments} />
          </section>
        ))}
      </Layout>
    );
  }
}

export default Comments;
