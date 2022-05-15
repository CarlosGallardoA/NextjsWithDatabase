import Layout from "components/Layout";
import { useRouter } from "next/router";
const HomePage = ({ tasks }) => {
  const router = useRouter();
  if (tasks.length === 0) {
    return (
      <Layout>
        <div className="container">
          <h1>Welcome to Task Manager</h1>
          <p>There are no tasks in your list.</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="d-flex justify-content-evenly flex-wrap">
        {tasks.map((task, index) => (
          <div className="container my-4" key={index}>
            <div className="card">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => router.push(`/tasks/${task.id}`)}
                  >
                    View
                  </button>{" "}
                  <button
                    className="btn btn-success"
                    onClick={() => router.push(`/tasks/${task.id}/edit`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
export const getServerSideProps = async (ctx) => {
  const res = await fetch(`${process.env.API_URL}/tasks`);
  const tasks = await res.json();
  return {
    props: {
      tasks,
    },
  };
};
export default HomePage;
