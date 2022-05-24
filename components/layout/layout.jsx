import Footer from "./footer";
import Header from "./header";

function Layout(props) {
  return (
    <>
      <Header />
      <main className="mx-1 xl:mx-40 2xl:mx-96 my-2">{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
