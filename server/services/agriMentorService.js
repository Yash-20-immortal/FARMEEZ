import Groq from 'groq-sdk';
import { CROP_DATABASE } from '../../src/data/cropDatabase.js';

// Groq client — reads GROQ_API_KEY from process.env automatically
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Model preference order (per user requirements)
// llama-3.3-70b-versatile → fallback to llama3-70b-8192
const PREFERRED_MODEL = 'llama-3.3-70b-versatile';
const FALLBACK_MODEL  = 'llama3-70b-8192';

const SYSTEM_PROMPT = `You are Agri Mentor, an expert agricultural advisor integrated into FARMEEZ, an educational farming simulation game. Your role is to analyze the player's real farm data and provide actionable, educational, and personalized advice.

RULES:
- Always reference the player's ACTUAL data. Never invent statistics.
- Pay close attention to their seedInventory. If they are out of seeds or low on seeds for the current or upcoming season, suggest they buy them from the Farm Store.
- Never invent or change market prices. Only analyze the prices provided to you.
- Be educational, friendly, professional, and concise.
- Responses must be structured JSON matching the schema below.
- Keep each field to 1-3 sentences. Be specific, not generic.
- Always explain the "why" behind every recommendation.

RESPONSE SCHEMA (respond ONLY with valid JSON, no markdown):
{
  "greeting": "personalized greeting referencing their actual level and season",
  "farmHealth": {
    "score": <number 1-10>,
    "badge": "<Excellent|Good|Needs Attention|Critical>",
    "reason": "specific explanation referencing their actual stats"
  },
  "marketAdvice": {
    "topCrop": "<crop name>",
    "action": "<SELL NOW|HOLD|STORE|WAIT>",
    "confidence": <number 1-100>,
    "reason": "specific reason based on actual season demand and price data"
  },
  "weatherEffect": "how the current season specifically affects their farm right now",
  "eventAdvice": "advice about the active event, or null if no event",
  "sustainability": {
    "score": <number 1-100>,
    "summary": "assessment of their eco score and farming choices",
    "tip": "one specific actionable improvement"
  },
  "learningTip": "based on their current lesson and quiz history, what they should study next",
  "nextRecommendation": "the single most important action they should take right now"
}`;

/**
 * Calls Groq to analyze the game state and return structured advice.
 * gameSummary is pre-built by the React frontend's buildGameSummary().
 * Returns the same JSON schema the frontend expects — no field changes.
 */
export async function analyzeGameState(gameSummary) {
  const userPrompt = `Analyze this player's farm and provide personalized advice.

CURRENT FARM DATA:
${JSON.stringify(gameSummary, null, 2)}

FARMING KNOWLEDGE BASE (USE THIS TO ANSWER):
${JSON.stringify(CROP_DATABASE, null, 2)}

Remember: Only analyze the actual data above. Do not invent prices or statistics. When suggesting crops, make sure they are in season according to the KNOWLEDGE BASE.
Respond ONLY with valid JSON matching the schema. No markdown, no code fences.`;

  // Try preferred model, fall back on model-not-found errors
  for (const model of [PREFERRED_MODEL, FALLBACK_MODEL]) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user',   content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });

      const text = completion.choices[0]?.message?.content ?? '';
      // Strip any stray markdown fences just in case
      const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      const isModelError = err?.status === 404 || err?.message?.toLowerCase().includes('model');
      if (isModelError && model !== FALLBACK_MODEL) {
        console.warn(`[AgriMentor] Model ${model} unavailable, falling back to ${FALLBACK_MODEL}`);
        continue;
      }
      throw err; // Re-throw non-model errors immediately
    }
  }
}

/**
 * Calls Groq to answer a free-form farming question with player context injected.
 * Returns plain text — no markdown, no JSON.
 */
export async function askAgriMentor(question, gameSummary) {
  const userPrompt = `A player is asking you a farming question. Always factor in their current game context when answering.

PLAYER CONTEXT:
- Level ${gameSummary.player.level}, Season: ${gameSummary.season}
- Eco Score: ${gameSummary.player.ecoScore}/100
- Coins: ${gameSummary.player.coins}
- Seed Inventory: ${JSON.stringify(gameSummary.player.seedInventory)}
- Harvests: ${gameSummary.player.farmingStats.totalHarvests}
- Active Event: ${gameSummary.activeEvent?.title || 'None'}
- Recent actions: ${(gameSummary.recentActions || []).join(', ') || 'None recorded'}

PLAYER QUESTION: "${question}"

FARMING KNOWLEDGE BASE (USE THIS TO ANSWER EDUCATIONAL QUESTIONS):
${JSON.stringify(CROP_DATABASE, null, 2)}

Respond as Agri Mentor — friendly, educational, specific to their situation. Use 2-4 paragraphs max. Plain text, no markdown.`;

  const QA_SYSTEM = 'You are Agri Mentor, an expert agricultural advisor in the FARMEEZ farming game. Be educational, friendly, concise, and always reference the player\'s actual situation. Respond in plain text only — no markdown, no bullet symbols.';

  for (const model of [PREFERRED_MODEL, FALLBACK_MODEL]) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: QA_SYSTEM },
          { role: 'user',   content: userPrompt }
        ],
        temperature: 0.8,
      });

      return completion.choices[0]?.message?.content ?? '';
    } catch (err) {
      const isModelError = err?.status === 404 || err?.message?.toLowerCase().includes('model');
      if (isModelError && model !== FALLBACK_MODEL) {
        console.warn(`[AgriMentor] Model ${model} unavailable, falling back to ${FALLBACK_MODEL}`);
        continue;
      }
      throw err;
    }
  }
}
