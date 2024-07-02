//GET (read)
import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (req,{params}) => {
   try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate('creator')
    if(!prompt) {
        return new Response(JSON.stringify({error: "Prompt not found"}, {status: 404}))
    }
    return new Response(JSON.stringify(prompt, {status: 200}))
   } catch (error) {
    console.log("error>>", error)
    return new Response(JSON.stringify({error: "Failed to fetch prompts"}, {status: 500}))
   }
}

//PATCH (update)
export const PATCH = async (req, { params }) => {
    try {
        await connectToDB();
        const updates = await req.json();
        
        const existingPrompt = await Prompt.findByIdAndUpdate(params.id, updates, { new: true }).populate('creator');
        
        console.log('existingPrompt :>> ', existingPrompt);
        
        if (!existingPrompt) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.log("error>>", error);
        return new Response(JSON.stringify({ error: "Failed to update prompt" }), { status: 500 });
    }
};

//DELETE (delete)
export const DELETE = async (req,{ params }) => {

    try {
        await connectToDB();
        const prompt = await Prompt.findByIdAndDelete(params.id);
        if (!prompt) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }
        return new Response(JSON.stringify({ message: "Prompt deleted successfully" }), { status: 200 });
    } catch (error) {
        console.log("error>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);
        return new Response(JSON.stringify({ error: "Failed to delete prompt" }), { status: 500 });
    }
};