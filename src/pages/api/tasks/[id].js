import { dbConnect } from "utils/db";
import Tasks from "models/Task";
dbConnect();
export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const task = await Tasks.findById(id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.status(200).json(task);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    case "PUT":
      try {
        const task = await Tasks.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.status(200).json(task);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    case "DELETE":
      try {
        const task = await Tasks.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.status(200).json(task);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
