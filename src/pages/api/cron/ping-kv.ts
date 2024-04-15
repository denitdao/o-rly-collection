import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";

export default function withAxiom(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (
    !process.env.CRON_SECRET ||
    request.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return response.status(401).json({ success: false });
  }

  kv.ping()
    .then((pong) => {
      console.log(pong);
      response.status(200).json({ result: pong });
    })
    .catch((error) => {
      console.error("Failed to ping KV", { reason: JSON.stringify(error) });
      response.status(500).json({ success: false });
    });
}
