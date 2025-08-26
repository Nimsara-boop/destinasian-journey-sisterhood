import { Card } from "@/components/ui/card";
import { Heart, MessageSquare, Eye } from "lucide-react";

interface Post {
  id: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  likes: number;
  comments: number;
  views?: number;
  caption: string;
  location: string;
}

interface PostGridProps {
  posts: any[];
  onPostClick: (postId: string) => void;
  onAuthorClick?: (authorName: string) => void;
}

const PostGrid = ({ posts, onPostClick, onAuthorClick }: PostGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="group relative aspect-square cursor-pointer overflow-hidden hover:scale-105 transition-transform duration-200"
          onClick={() => onPostClick(post.id)}
        >
          <img
            src={post.image}
            alt={post.caption}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay with stats (appears on hover) */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-white" />
                <span className="font-semibold">{post.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 fill-white" />
                <span className="font-semibold">{post.comments}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span className="font-semibold">{post.views}</span>
              </div>
            </div>
          </div>
          
          {/* Author info at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-white/10 rounded p-1 -m-1 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onAuthorClick?.(post.author.name);
              }}
            >
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full border border-white/50"
              />
              <span className="text-white text-sm font-medium truncate">
                {post.author.name}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PostGrid;