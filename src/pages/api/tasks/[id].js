import { pool } from "utils/db";
export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;
  const { title, description } = body;
  switch (method) {
    case "GET":
      try {
        const [task] = await pool.query("SELECT * FROM task WHERE id = ?", [
          id,
        ]);
        return res.status(200).json(task);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    case "PUT":
      try {
        const [result] = await pool.query(
          "UPDATE task SET title = ?, description = ? WHERE id = ?",
          [title, description, id]
        );
        return res.status(200).json({ title, description, id });
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    case "DELETE":
      try {
        const [result] = await pool.query("DELETE FROM task WHERE id = ?", [
          id,
        ]);
        return res.status(200).json({ message: "Task deleted" });
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
