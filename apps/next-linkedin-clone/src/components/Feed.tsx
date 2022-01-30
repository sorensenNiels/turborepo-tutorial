/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { handlePostState, useSSRPostsState } from '../atoms/postAtom';
import { PostType } from '../types';
import Input from './Input';
import Post from './Post';

type FeedProps = {
  posts: PostType[];
};

const Feed = ({ posts }: FeedProps) => {
  const [realtimePosts, setRealtimePosts] = useState<PostType[]>([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();
      setRealtimePosts(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };

    fetchPosts();
  }, [handlePost]);

  // console.log(realtimePosts);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/* Posts */}
      <div className="space-y-3">
        {/* BONUS -> Add server side rendered posts */}
        {!useSSRPosts
          ? realtimePosts.map(post => <Post key={post._id} post={post} />)
          : posts.map(post => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Feed;
