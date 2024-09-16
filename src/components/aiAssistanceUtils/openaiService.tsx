// openaiService.tsx
import axios from "axios";

const OPENAI_API_KEY = import.meta.env.REACT_APP_OPENAI_API_KEY || "";

const apiUrl = "https://api.openai.com/v1/completions";

export const getGptResponse = async (message: string) => {
    try {
      const response = await axios.post(apiUrl, {
        model: "gpt-3.5-turbo", // Specify GPT-3.5-turbo model
        messages: [{ role: "user", content: message }],
        max_tokens: 150, // Adjust token limit based on response length
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      });

      return response.data.choices[0].message.content; // Return the model's response
  } catch (error) {
    console.error("Error fetching GPT-3.5 response:", error);
    throw error;
  }
};