import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Heart, MessageSquare, Share, BookmarkPlus, MoreHorizontal } from "lucide-react";

interface Post {
  id: number;
  image: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  likes: number;
  comments: number;
  views: number;
  caption: string;
  location: string;
  timestamp: string;
}

interface PostViewerProps {
  posts: Post[];
  initialPostId: number;
  onBack: () => void;
}

const PostViewer = ({ posts, initialPostId, onBack }: PostViewerProps) => {
  const initialIndex = posts.findIndex(post => post.id === initialPostId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const currentPost = posts[currentIndex];

  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'down' && currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'up' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLike = () => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(currentPost.id)) {
      newLikedPosts.delete(currentPost.id);
    } else {
      newLikedPosts.add(currentPost.id);
    }
    setLikedPosts(newLikedPosts);
  };

  const isLiked = likedPosts.has(currentPost.id);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-white text-sm">
            {currentIndex + 1} / {posts.length}
          </div>
        </div>
      </div>

      {/* Post Content - Scrollable */}
      <div className="h-full overflow-y-auto snap-y snap-mandatory">
        {posts.map((post, index) => (
          <div key={post.id} className="h-screen snap-start relative flex flex-col">
            {/* Post Image */}
            <div className="flex-1 relative">
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation hints */}
              {index < posts.length - 1 && (
                <div 
                  className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce cursor-pointer"
                  onClick={() => handleScroll('down')}
                >
                  ↓ Swipe up for next
                </div>
              )}
            </div>

            {/* Post Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent text-white p-4">
              {/* Author Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-white/20">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{post.author.name}</span>
                      {post.author.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-white/70">
                      {post.location} • {post.timestamp}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>

              {/* Caption */}
              <p className="text-sm mb-4 line-clamp-3">{post.caption}</p>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-white/20 p-0"
                    onClick={handleLike}
                  >
                    <Heart className={`w-6 h-6 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-0">
                    <MessageSquare className="w-6 h-6 mr-2" />
                    <span className="text-sm">{post.comments}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-0">
                    <Share className="w-6 h-6" />
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-0">
                  <BookmarkPlus className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostViewer;