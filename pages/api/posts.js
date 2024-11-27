// pages/api/posts.js
import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const posts = await db.collection('posts').find({}).toArray(); // Replace with your collection name

    res.status(200).json(posts); // Send data as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
