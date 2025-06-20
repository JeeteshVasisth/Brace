export async function handler(event, context) {
  let keyword = "natural disaster"; // Default keyword

  try {
    const body = JSON.parse(event.body || "{}"); // Fallback to empty object
    if (body.keyword) {
      keyword = body.keyword; // Don't double-encode here
    }
  } catch (err) {
    console.warn("Invalid JSON body. Using default keyword.");
  }

  // ✅ Only encode when inserting into the URL
  const url = `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(keyword)}&category=science&language=en&pageSize=10`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": process.env.NEWS_API_KEY,
      },
    });

    const data = await response.json();

    const articles = (data.articles || []).map(article => ({
      title: article.title,
      url: article.url,
      source: article.source.name,
      description: article.description || "No description available.",
      publishedAt: new Date(article.publishedAt).toLocaleString(),
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ articles }),
    };
  } catch (err) {
    console.error("News API error:", err.message || err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
}
