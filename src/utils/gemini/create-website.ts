import genAI from ".";

export async function createWebsite(prompt: string) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-pro"
        });

        const completePrompt = `Create a complete website based on the passed idea, respond in valid json format, with the keys "HTMLs", "CSSs" and "JSs".
        Each key should be an array of objects, this object will contain the file name and the file content.
        Example:
        '{
            "HTMLs": [
                {
                    "name": "index.html",
                    "content": "<html><head></head><body></body></html>"
                }
            ],
            "CSSs": [
                {
                    "name": "style.css",
                    "content": "body { background-color: red; }"
                }
            ],
            "JSs": [
                {
                    "name": "script.js",
                    "content": "console.log('Hello, World!')"
                }
            ]
        }'

        Write the files completely, creating more than one file if necessary.
        Do not return anything other than the object with the keys "HTMLs", "CSSs" and "JSs".
        Do not use comments in the code and the code should be indented.
        Never use the backtick character within the content key (\`).
        Return only the valid JSON object
        Idea: ${prompt}`;

        const result = await model.generateContent(completePrompt);
        const response = result.response;
        const text = response.text();
        const textJson = text.replace('```json\n', '').replace('```', '');
        const textJsonParsed = JSON.parse(textJson);

        return textJsonParsed;
    } catch (error) {
        console.error(error);
    }
}

