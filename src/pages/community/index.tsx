import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft } from "lucide-react";
import PostGrid from "./components/PostGrid";
import PostViewer from "./components/PostViewer";
import CommunityNavbar from "./components/CommunityNavbar";
import MessagesPage from "./components/MessagesPage";

const Community = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'grid' | 'post-viewer' | 'messages'>('grid');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Mock data for posts
  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1589308155743-4ad772863eae",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        verified: true
      },
      likes: 124,
      comments: 18,
      views: 892,
      caption: "Just discovered this amazing hidden beach in Mirissa! The sunrise here is absolutely breathtaking 🌅 Perfect spot for morning yoga and meditation.",
      location: "Mirissa, Sri Lanka",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1580394693539-2111f706eaad",
      author: {
        name: "Maya Patel",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      },
      likes: 89,
      comments: 12,
      views: 543,
      caption: "Temple hopping in Kandy today! The architecture and history here never fails to amaze me. Feeling so grateful for this journey ✨",
      location: "Kandy, Sri Lanka",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
      author: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
      },
      likes: 156,
      comments: 23,
      views: 1205,
      caption: "Solo female travelers unite! 💪 Just finished an incredible trek through Ella Rock. The views were worth every step!",
      location: "Ella, Sri Lanka",
      timestamp: "6 hours ago"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
      author: {
        name: "Zara Ahmed",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      },
      likes: 203,
      comments: 31,
      views: 1567,
      caption: "Street food adventures in Colombo! This kottu roti is life-changing 🍜 Who else is obsessed with Sri Lankan cuisine?",
      location: "Colombo, Sri Lanka",
      timestamp: "8 hours ago"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1546556874-8964792e36fa",
      author: {
        name: "Lily Thompson",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9"
      },
      likes: 78,
      comments: 9,
      views: 423,
      caption: "Sunset vibes at Galle Fort 🌇 There's something magical about this place. Perfect end to a perfect day!",
      location: "Galle, Sri Lanka", 
      timestamp: "1 day ago"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1584552539816-caf637eff5a3",
      author: {
        name: "Priya Singh",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      likes: 145,
      comments: 16,
      views: 743,
      caption: "Whale watching in Trincomalee was incredible! 🐋 Nature never stops surprising me. So grateful for these magical moments.",
      location: "Trincomalee, Sri Lanka",
      timestamp: "1 day ago"
    }
  ];

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
    setCurrentView('post-viewer');
  };

  const handleMessagesClick = () => {
    setCurrentView('messages');
  };

  const handleBackToGrid = () => {
    setCurrentView('grid');
    setSelectedPostId(null);
  };

  const handleBackFromMessages = () => {
    setCurrentView('grid');
  };

  // If not logged in, show login required message
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-24 px-4 pb-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-lg shadow-lg p-8">
              <User className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-4">Sign in Required</h2>
              <p className="text-muted-foreground mb-6">
                Please sign in to access the community features and connect with other travelers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => navigate('/login')}
                  className="px-8 py-2"
                >
                  Sign In / Sign Up
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="px-8 py-2 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render different views based on currentView state
  if (currentView === 'post-viewer' && selectedPostId) {
    return (
      <PostViewer
        posts={posts}
        initialPostId={selectedPostId}
        onBack={handleBackToGrid}
      />
    );
  }

  if (currentView === 'messages') {
    return <MessagesPage onBack={handleBackFromMessages} />;
  }

  // Default grid view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CommunityNavbar onMessagesClick={handleMessagesClick} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto my-10">
          <PostGrid posts={posts} onPostClick={handlePostClick} />
        </div>
      </div>
    </div>
  );
};

export default Community;