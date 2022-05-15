import Layout from "components/Layout";
import Error from "next/error";
import { useRouter } from "next/router";
const TaskDetail = ({ task, error }) => {
  const router = useRouter();
  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  const deleteTask = async (id_delete) => {
    await handleDelete(id_delete);
    router.push("/");
  };
  const handleDelete = async (id_delete) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id_delete}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div className="container my-4 text-center">
        <div className="card d-flex align-items-center">
          <div className="card-body">
            <h5 className="card-title">{task[0].title}</h5>
            <p className="card-text">{task[0].description}</p>
            <button
              className="btn btn-danger"
              onClick={() => deleteTask(task[0].id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`${process.env.API_URL}/tasks/${id}`);
  if (res.status === 200) {
    const task = await res.json();
    console.log(task);
    return {
      props: {
        task,
      },
    };
  }
  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Task not found",
      },
    },
  };
}
export default TaskDetail;
