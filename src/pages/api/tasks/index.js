import { dbConnect } from "utils/db";
import Tasks from "models/Task";
dbConnect();
export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const tasks = await Tasks.find();
        return res.status(200).json(tasks);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    case "POST":
      try {
        const task = await Tasks.create(body);
        return res.status(201).json(task);
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
