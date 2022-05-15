import Layout from "components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const TaskForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const createTask = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    } catch (error) {
      console.error(error);
    }
  };
  const updateTask = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (router.query.id) {
      await updateTask();
    } else {
      await createTask();
    }
    router.push("/");
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const getTask = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${router.query.id}`
      );
      const task = await res.json();
      setForm({ title: task[0].title, description: task[0].description });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (router.query.id) {
      getTask();
    }
  }, []);
  return (
    <Layout>
      <div className="container mt-4 form_container">
        <form onSubmit={handleSubmit}>
          <div className="text-center text-form">
            {router.query.id ? "Update Task" : "Created Task"}
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={handleChange}
              required
              value={form.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              className="form-control"
              onChange={handleChange}
              required
              value={form.description}
            ></textarea>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary d-block">
              {router.query.id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default TaskForm;
