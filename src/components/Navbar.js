import Link from "next/link";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between">
        <div>
          <Link href="/">
            <a className="navbar-brand">TaskApp</a>
          </Link>
        </div>
        <div>
          <button
            className="btn btn-light"
            onClick={() => router.push("/tasks/new")}
          >
            New Task
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
