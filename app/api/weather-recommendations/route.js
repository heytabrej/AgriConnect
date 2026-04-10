import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
    if (!NVIDIA_API_KEY) {
      return NextResponse.json({ error: "NVIDIA API key is not configured." }, { status: 500 });
    }

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        model: "google/gemma-3-27b-it",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2048,
        temperature: 0.2,
        top_p: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("NVIDIA API Error:", response.status, errorData);
      return NextResponse.json(
        { error: errorData?.error?.message || `API returned status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const resultText = data?.choices?.[0]?.message?.content || "";

    return NextResponse.json({ result: resultText || "No response from AI." });
  } catch (err) {
    console.error("Weather Recommendations API Error:", err);
    return NextResponse.json({ error: err?.message || "An unexpected error occurred." }, { status: 500 });
  }
}
