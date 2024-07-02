"use client"

import Form from "@components/Form"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPrompt = () => {
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const router = useRouter()
  const [post, setpost] = useState(
    {
      prompt : "",
      tag: ""
    }
  );
  const [submitting, setsubmitting] = useState(false);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    !promptId && alert("Missing prompt id")

    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
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
  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`api/prompt/${promptId}`)
        const data = await response.json()
        console.log('data :>> ', data);
        // setpost(data)
        setpost({
            prompt: data.prompt,
            tag: data.tag,
        })
    }
    promptId && getPromptDetails()
  }, [promptId]);
  return (
    <Form type="Edit" post={post} setpost={setpost} submitting={submitting} handlesubmit={updatePrompt}></Form>
  )
}

export default EditPrompt