import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"],
  dangerouslyAllowBrowser: true
});

export async function sendMsgToOpenAI(message) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: message }
    ]
  });
  console.log(response)
  return response.data.choices[0].text;
}