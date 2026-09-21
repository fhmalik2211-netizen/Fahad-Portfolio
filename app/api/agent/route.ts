export const runtime = "nodejs";

const DEFAULT_BASE_URL = "https://openrouter.ai/api/v1";
const DEFAULT_MODEL = "openai/gpt-4o-mini";

const systemPrompt = `You are a professional AI assistant representing Fahad's portfolio website.
Your job is to answer visitor questions about his services, experience, skills, products, workflow, and how to collaborate.
Keep answers concise, confident, and polished. Speak naturally and professionally.
When appropriate, mention that Fahad builds full-stack products, UI/UX systems, and modern digital experiences.
If asked for direct contact, politely guide the user to the contact section or say to reach out via the website contact form.
Do not claim facts beyond the portfolio context. If unsure, say you can help connect them with the portfolio owner.`;

export async function POST(request: Request) {
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "AI_API_KEY is missing. Add your API key in the environment before using the assistant.",
      },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const userMessage = typeof body?.message === "string" ? body.message.trim() : "";

    if (!userMessage) {
      return Response.json({ error: "A message is required." }, { status: 400 });
    }

    const baseUrl = process.env.AI_BASE_URL || DEFAULT_BASE_URL;
    const model = process.env.AI_MODEL || DEFAULT_MODEL;

    const upstreamResponse = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Fahad Portfolio Agent",
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const contentType = upstreamResponse.headers.get("content-type") || "";
    const responseText = await upstreamResponse.text();

    if (!upstreamResponse.ok) {
      let errorMessage = "The external AI model is unavailable at the moment.";

      if (contentType.includes("application/json")) {
        try {
          const json = JSON.parse(responseText);
          errorMessage = json?.error?.message || errorMessage;
        } catch {
          errorMessage = responseText || errorMessage;
        }
      } else {
        errorMessage = responseText || errorMessage;
      }

      return Response.json({ error: errorMessage }, { status: upstreamResponse.status || 500 });
    }

    if (!contentType.includes("application/json")) {
      return Response.json({ error: "Unexpected response format from provider." }, { status: 502 });
    }

    const data = JSON.parse(responseText);
    const answer =
      data?.choices?.[0]?.message?.content ||
      "I’m ready to help, but I couldn’t generate a response this time. Please try again.";

    return Response.json({ answer });
  } catch (error) {
    console.error("AI agent error:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while generating the response.",
      },
      { status: 500 },
    );
  }
}
