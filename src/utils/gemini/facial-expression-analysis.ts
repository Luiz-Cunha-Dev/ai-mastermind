import genAI from ".";

export async function facialExpressionAnalysis(image: File) {
  try {
    
    const model = genAI.getGenerativeModel({
      model: "gemini-pro-vision"
    });

    // Converta o file para base64
    let base64Image: string = '';
    const reader = new FileReader();
    reader.onload = () => {
      base64Image = reader.result as string;
    };
    reader.readAsDataURL(image);

    // Aguarde até que a imagem seja convertida para base64
    while (!base64Image) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Remova o prefixo "data:[mediatype];base64," da string base64
    const base64Data = base64Image.split(",")[1];

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: image.type
      },
    };

const prompt = `Given an image of a person, identify the number of people in the image, the facial expressions, age, and gender. Return a valid JSON object with the key "people", people is an array of objects, each object will contain the keys "age", "expression" and "gender".
    Example:
    {
        "persons": [
            {
                "age": 25,
                "expression": "happy",
                "gender": "female",
            }
        ]
    }`;

    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response;
    const text = response.text();
    const textJson = text.replace('```json\n', '').replace('```', '');
    const textJsonParsed = JSON.parse(textJson);

    return textJsonParsed;
    
  } catch (error) {
    console.error(error);
  }
}