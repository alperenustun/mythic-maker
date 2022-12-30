import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createImage({
    prompt: generatePrompt(req.body.character),
    num_images: 4,
    size: "512x512",
  });
  res.status(200).json({ result: completion.data.data });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `${capitalizedAnimal} Ultra Realistic RPG Character`;
}
