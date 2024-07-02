'use client';

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState([]);


    const handleEdit = (post) => {
        router.push(`update-prompt/?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this post?');
        if (hasConfirmed) {
            try {
                const response = await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' });
                console.log('response :>> ', response);
                if (response.ok) {
                    const updatedPosts = myPosts.filter(p => p._id !== post._id);
                    setMyPosts(updatedPosts);
                  } else {
                    console.error('Failed to delete post:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            if (session?.user.id) {
                try {
                    const response = await fetch(`/api/users/${session?.user.id}/posts`);
                    const data = await response.json();
                    setMyPosts(data);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            }
        };

        fetchPosts();
    }, [session?.user.id]);

    return (
        <Profile 
            name="My" 
            desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination" 
            data={myPosts} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
        />
    );
};

export default MyProfile;
