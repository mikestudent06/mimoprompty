"use client"

import Form from "@components/Form"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState(
    {
      prompt : "",
      tag: ""
    }
  );
  const createPrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    try {
      const response = await fetch('api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        })
      })
      if (response.ok) {
        router.push('/') 
      }
     
    } catch (error) {
      console.log('error :>> ', error);
    } finally{
      setsubmitting(false);
    }
  }
  return (
    <Form type="Create" post={post} setpost={setpost} submitting={submitting} handlesubmit={createPrompt}></Form>
  )
}

export default CreatePrompt