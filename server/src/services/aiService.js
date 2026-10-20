const Groq = require('groq-sdk');

let groqClient = null;

const getGroqClient = () => {
  if (!groqClient) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not defined in environment variables');
    }
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
};

// Priority list of models to try
const CANDIDATE_MODELS = [
  process.env.GROQ_MODEL,
  'llama-3.3-70b-versatile',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'qwen/qwen3.8-27b',
].filter(Boolean);

/**
 * Execute chat completion with model fallback
 */
async function createChatCompletionWithFallback(params) {
  const groq = getGroqClient();
  let lastError = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await groq.chat.completions.create({
        ...params,
        model,
      });
      const content = response.choices?.[0]?.message?.content;
      if (content) {
        return content.trim();
      }
    } catch (err) {
      lastError = err;
      console.warn(`[Groq AI] Model "${model}" failed (${err.message}). Trying fallback...`);
    }
  }

  throw lastError || new Error('All candidate Groq models failed to generate response');
}

/**
 * Improve job description using Groq LLM
 */
async function improveDescription(description) {
  if (!description || !description.trim()) {
    throw new Error('Description is required for AI improvement');
  }

  try {
    const content = await createChatCompletionWithFallback({
      messages: [
        {
          role: 'system',
          content:
            'You are a professional job description writer. Improve the following job description to be clear, professional, and compelling. Maintain good formatting with HTML tags (<p>, <ul>, <li>, <strong>) where appropriate for a rich text editor. Return only the improved content with no preamble or conversational text.',
        },
        {
          role: 'user',
          content: description,
        },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    return content;
  } catch (error) {
    console.error('[AI Service Error - improveDescription]:', error.message);
    throw new Error(`AI improvement failed: ${error.message}`);
  }
}

/**
 * Generate 2-3 sentence job summary using Groq LLM
 */
async function generateSummary(jobData) {
  const { title, companyName, description, skills, jobCategory, experienceMin, experienceMax } = jobData;

  const cleanDescription = description ? description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';

  const prompt = `Job Title: ${title || 'N/A'}
Company: ${companyName || 'N/A'}
Category: ${jobCategory || 'General'}
Skills: ${Array.isArray(skills) ? skills.join(', ') : 'Not specified'}
Experience: ${experienceMin || 0}-${experienceMax || 0} years
Description: ${cleanDescription.slice(0, 1500)}`;

  try {
    const content = await createChatCompletionWithFallback({
      messages: [
        {
          role: 'system',
          content:
            'You are a recruitment assistant. Write a concise 2-3 sentence job summary highlighting the core role and key requirements that a candidate would find immediately useful. Return only the summary with no introductory greetings or commentary.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 256,
      temperature: 0.5,
    });

    return content;
  } catch (error) {
    console.error('[AI Service Error - generateSummary]:', error.message);
    throw new Error(`AI summary generation failed: ${error.message}`);
  }
}

module.exports = {
  improveDescription,
  generateSummary,
};
