'use client';

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const EditPrompt = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const router = useRouter();
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) {
      alert("Missing prompt id");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log('error :>> ', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      if (promptId) {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        console.log('data :>> ', data);
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      }
    };
    getPromptDetails();
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

const EditPromptWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
};

export default EditPromptWrapper;
