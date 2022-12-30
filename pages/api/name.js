import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// export default async function (req, res) {
//   const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: generatePrompt(req.body.animal),
//     temperature: 0.8,
//   });
//   res.status(200).json({ result: completion.data.choices[0].text });
// }

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.character),
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const result = completion.data.choices[0].text.split('\n').filter(item => item !== '');
  console.log(result);
  res.status(200).json({ name: result[0], stats: result[1], appearance: result[2], personality: result[3], story: result[4] });
}

function generatePrompt(character) {
  const capitalizedCharacter =
  character[0].toUpperCase() + character.slice(1).toLowerCase();
  return `Generate me a ${capitalizedCharacter} class RPG character with a name, stats(seperate with ,), appearance, personality, and story`;
}