import OpenAI from 'openai';
import { CreateGeneratedPageDto } from './types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const sendPrompt = async (prompt: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0].message.content || 'No reply from AI';
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    throw new Error('Failed to get response from OpenAI.');
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const replaceVariables = <T extends Record<string, any>>(
  template: string,
  data: T
): string => {
  return template.replace(/%(\w+)%/g, (match, varName) => {
    const replacement = data[varName];
    if (replacement === undefined) {
      console.warn(`Warning: No matching property for variable "${varName}"`);
      return match;
    }
    return String(replacement);
  });
};

export const generatePage = async (
  prompts: string[],
  data: CreateGeneratedPageDto
) => {
  const processedPrompts = prompts.map((prompt) =>
    replaceVariables(prompt, data)
  );
  let response: string = '';

  for (const prompt of processedPrompts) {
    response = await sendPrompt(prompt);
  }

  return response;
};
