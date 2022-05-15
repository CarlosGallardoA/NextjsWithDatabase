// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pool } from "utils/db";
// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default async function handler(req, res) {
  const [rows] = await pool.query("SELECT NOW()");
  return res.status(200).json(rows[0]["NOW()"]);
}
