
import { GoogleGenAI, Modality } from "@google/genai";

/**
 * ARCHITECT NOTE:
 * We use Gemini 2.5 Flash Preview TTS to generate audio prompts for low-literacy patients.
 * This allows us to personalize announcements like "Mr. Ahmad, please leave your home now."
 */

export const generateStatusAudio = async (text: string): Promise<string | undefined> => {
  // Always initialize GoogleGenAI with a named parameter using process.env.API_KEY directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say warmly in Urdu: ${text}` }] }],
      config: {
        // responseModalities must be an array with exactly one Modality.AUDIO element.
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    // Extract the raw PCM audio bytes (base64 encoded) from the response part's inlineData.
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return undefined;
  }
};
