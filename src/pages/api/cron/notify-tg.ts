import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { Logger } from "next-axiom";

export default async function handler(
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
  try {
    const stats = await collectStats();
    const notifyResponse = await notify(stats);
    log.info(notifyResponse);
    response.status(200).json({ success: true, message: notifyResponse });
  } catch (error) {
    log.error("Failed to collect stats", { reason: JSON.stringify(error) });
    response.status(500).json({ success: false, message: error });
  }
}

type ImageStats = Record<string, number>;
type SearchStats = Record<string, number>;

async function collectStats() {
  // Retrieve stats
  const copyStats = await kv.hgetall<ImageStats>("copy__links");
  const viewStats = await kv.hgetall<ImageStats>("view__images");
  const searchStats = await kv.hgetall<SearchStats>("search__queries");
  const sortStats = await kv.hgetall<SearchStats>("sort__modes");

  // Format stats
  let statsString = "📊 *OrlyBooks Statistics* 📊\n\n\n";
  statsString += formatTopStats("📎 *Link Copy Stats:*", copyStats);
  statsString += "\n" + formatTopStats("🌅 *Image View Stats:*", viewStats);
  statsString +=
    "\n" + formatSearchStats("🔎 *User Search Queries:*", searchStats);
  statsString += "\n" + formatSearchStats("↕️ *Sort Stats:*", sortStats);
  statsString += "\n\n#orlybooks";

  return statsString;
}

function formatTopStats(title: string, stats: ImageStats | null) {
  let statsString = `${title}\n`;
  if (stats) {
    // Sort and get top 10
    const sortedStats = Object.entries(stats)
      .filter(([_, count]) => count > 1)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 10);

    for (const [name, count] of sortedStats) {
      statsString += `_${name}_:  ${count}\n`;
    }

    // Total counts
    const totalCounts = Object.values(stats).reduce(
      (acc, count) => acc + Number(count),
      0,
    );
    const distinctCounts = Object.keys(stats).length;

    statsString += `\n*Total:*  ${totalCounts}\n`;
    statsString += `*Distinct:*  ${distinctCounts}\n`;
  }
  return statsString;
}

function formatSearchStats(title: string, stats: SearchStats | null) {
  let statsString = `${title}\n`;
  if (stats) {
    // Aggregate searches and sort
    const searchAggregates: Record<string, number> = {};
    for (const query of Object.keys(stats)) {
      const lowerQuery = query.toLowerCase();
      searchAggregates[lowerQuery] = stats[query] ?? 0;
    }

    const sortedSearches = Object.entries(searchAggregates)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 20);

    statsString += "`";
    for (const [query, count] of sortedSearches) {
      statsString += `${query} (${count})\n`;
    }
    statsString += "`";
  }
  return statsString;
}

async function notify(data: string) {
  const API_URL = `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: process.env.TG_CHAT_ID,
    text: data,
    parse_mode: "Markdown",
  };

  const botResponse = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return JSON.stringify(await botResponse.json());
}
