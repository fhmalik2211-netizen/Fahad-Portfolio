export const runtime = "nodejs";

const DEFAULT_BASE_URL = "https://openrouter.ai/api/v1";
const DEFAULT_MODEL = "openai/gpt-4o-mini";
const CONTACT_EMAIL = "unknownfahai@gmail.com";

const systemPrompt = `You are Fahad Hassan's portfolio assistant. Answer visitors directly using the verified portfolio facts below.

VERIFIED PORTFOLIO FACTS
- Fahad has about 2 years of combined professional and independent development experience.
- Experience: 1+ year as a Full-Stack Developer at GoEnterprise, 6 months as a Developer at WP Rogers, and 6 months building self projects as an Independent Builder.
- He builds full-stack web products, ecommerce websites, end-to-end websites, responsive interfaces, backend systems, APIs, and UI systems.
- Frontend skills: Next.js, React, TypeScript, Tailwind CSS, responsive design, accessibility, performance optimization, state management, Redux Toolkit, and component libraries.
- Backend skills: Node.js, Express, RESTful API design, PostgreSQL, MongoDB, MySQL, authentication, authorization, and queues.
- Services: ecommerce websites, website redesigns, bug fixing, optimization, frontend development, backend development, API/CMS integrations, performance, and accessibility improvements.
- He can help from early planning through design, development, launch, and final polish.
- Direct email: ${CONTACT_EMAIL}.
- Location: Chiniot, Sargodha.
- He usually replies within two business days.

ANSWERING RULES
- Answer the visitor's exact question first. Do not make them ask again for a fact listed above.
- For experience questions, always state: "Fahad has about 2 years of combined experience" and briefly break down the roles when useful.
- For skills or stack questions, group technologies by frontend, backend, and product instead of dumping an unstructured list.
- For service questions, recommend the most relevant service and ask one useful follow-up question only when needed.
- For hiring or contact questions, give the direct email ${CONTACT_EMAIL} and also mention the website contact section.
- If someone asks only for Fahad's email, answer immediately with exactly: "Fahad's email is ${CONTACT_EMAIL}. You can also use the contact form on this website."
- Keep normal answers to 2-5 short sentences. Use bullets when listing several items.
- Be confident, warm, and professional. Never invent clients, dates, prices, results, degrees, or technologies not listed above.
- If a detail is not in the verified facts, say that it is not listed and offer to help with the available portfolio information.
- Match the visitor's language when practical, including Urdu or Roman Urdu, while keeping technical names in English.`;

export async function POST(request: Request) {
  const configuredApiKey = process.env.AI_API_KEY?.trim();

  if (!configuredApiKey) {
    return Response.json(
      {
        error:
          "AI_API_KEY is missing. Add your API key in the environment before using the assistant.",
      },
      { status: 500 },
    );
  }

  try {
    const apiKey = configuredApiKey.replace(/^Bearer\s+/i, "");
    const body = await request.json();
    const userMessage = typeof body?.message === "string" ? body.message.trim() : "";

    if (!userMessage) {
      return Response.json({ error: "A message is required." }, { status: 400 });
    }

    const normalizedMessage = userMessage.toLowerCase();
    const isContactQuestion =
      /\b(email|e-mail|mail|contact|reach|hire|hiring|work with|whatsapp)\b/.test(
        normalizedMessage,
      );
    const asksForEmail = /\b(email|e-mail|mail)\b/.test(normalizedMessage);

    if (isContactQuestion && asksForEmail) {
      return Response.json({
        answer: `Fahad's email is ${CONTACT_EMAIL}. You can also use the contact form on this website.`,
      });
    }

    const baseUrl = process.env.AI_BASE_URL || DEFAULT_BASE_URL;
    const model = process.env.AI_MODEL || DEFAULT_MODEL;

    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
        "X-Title": "Fahad Portfolio Agent",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 300,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const contentType = response.headers.get("content-type") || "";
    const responseText = await response.text();

    if (!response.ok) {
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

      if (response.status === 401) {
        errorMessage =
          "The AI provider rejected the API key. Check that AI_API_KEY is a valid key for AI_BASE_URL.";
      }

      return Response.json({ error: errorMessage }, { status: response.status || 500 });
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
