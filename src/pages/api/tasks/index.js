import { pool } from "utils/db";
export default async function handler(req, res) {
  const { method, body } = req;
  const { title, description } = body;
  switch (method) {
    case "GET":
      try {
        const [tasks] = await pool.query("SELECT * FROM task");
        return res.status(200).json(tasks);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    case "POST":
      try {
        console.log("creating task");
        const [result] = await pool.query("INSERT INTO task SET ?", {
          title,
          description,
        });
        return res
          .status(200)
          .json({ title, description, id: result.insertId });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
