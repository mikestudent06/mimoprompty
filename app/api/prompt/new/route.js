import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const POST  = async (req) => {
    const {prompt, tag, userId} = await req.json()

    try {
        await connectToDB()

       const newPrompt = new Prompt({creator: userId, prompt, tag})
       await newPrompt.save()
       return new Response(JSON.stringify(newPrompt), {status: 201})
        
    } catch (error) {
        console.log('error :>> ', error);
        return new Response(JSON.stringify({error: 'An error occurred while creating a prompt'}), {status: 500})
    }
}