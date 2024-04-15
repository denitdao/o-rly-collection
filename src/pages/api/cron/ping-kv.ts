import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { Logger } from "next-axiom";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (
    !process.env.CRON_SECRET ||
    request.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return response.status(401).json({ success: false });
  }

  const log = new Logger();
  kv.ping()
    .then((pong) => {
      log.info(pong);
      response.status(200).json({ result: pong });
    })
    .catch((error) => {
      log.error("Failed to ping KV", { reason: JSON.stringify(error) });
      response.status(500).json({ success: false });
    });
}
