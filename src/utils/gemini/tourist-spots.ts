'use server';
import genAI from ".";
import axios from "axios";

type spot = {
    address: string;
    description: string;
    google_maps_link: string;
    latitude: number;
    longitude: number;
    name: string;
    imageUrl: string;
  }

export async function touristSpots(country: string, state?: string, city?: string) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-pro"
        });

        let prompt =
            `Return an array of valid JSON objects with the name of the tourist spot, address, latitude and longitude, the Google Maps link, and description.
Example:
[
    {
        "name": "Hiroshima Castle",
        "latitude": 34.4063,
        "longitude": 132.4605,
        "google_maps_link": "https://www.google.com/maps?q=21-1+Motomachi,+Naka+Ward,+Hiroshima,+730-0011,+Japan",
        "description": "Historically reconstructed castle with a museum displaying artifacts and telling the history of Hiroshima.",
        "address": "21-1 Motomachi, Naka Ward, Hiroshima, 730-0011, Japan"
    }
]
never return anything other than the JSON object.
return a maximum of 5 tourist destinations.
Country: ${country}
${state ? `State: ${state}` : ''}
${city ? `City: ${city}` : ''}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        const textJson = text.replace('```json\n', '').replace('```', '');
        const textJsonParsed = JSON.parse(textJson);

        const promises = textJsonParsed.map(async (spot: spot ) => {
            const imageUrl = await getFirstGoogleImageUrlByTopic(spot.name);
            return { ...spot, imageUrl };
        });

        const updatedSpots: spot[] = await Promise.all(promises);

        for (const spot of updatedSpots) {
            if (spot.google_maps_link.startsWith("https://goo.gl/")) {
                spot.google_maps_link = `https://www.google.com/maps?q=${spot.latitude},${spot.longitude}`;
            }
        }

        return updatedSpots;

    } catch (error) {
        console.error(error);
    }
}

async function getFirstGoogleImageUrlByTopic(topic: string) {
    try {
        const response = await axios.get(`https://www.google.com/search?q=${topic}&tbm=isch`);
        const html = response.data;
        const firstImageUrl = html.match(/src="(https:\/\/[^"]*)/)[1];
        return firstImageUrl;
    } catch (error) {
        console.error(error);
    }
}
