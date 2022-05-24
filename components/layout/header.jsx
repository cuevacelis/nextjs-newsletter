import Link from "next/link";

function Header(props) {
  return (
    <header>
      <nav className="bg-orange-500 flex bg-center items-center justify-center py-4">
        <Link href={"/"}>
          <a className="text-2xl text-white">Home</a>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
