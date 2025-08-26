import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft } from "lucide-react";
import PostGrid from "./components/PostGrid";
import PostViewer from "./components/PostViewer";
import CommunityNavbar from "./components/CommunityNavbar";
import MessagesPage from "./components/MessagesPage";
import ProfileCardModal from "./components/ProfileCardModal";
import { usePosts } from "@/hooks/usePosts";

const Community = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'grid' | 'post-viewer' | 'messages'>('grid');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<{ name: string } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { posts, loading: postsLoading } = usePosts();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handlePostClick = (postId: string) => {
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

  const handleAuthorClick = (authorName: string) => {
    setSelectedProfile({ name: authorName });
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedProfile(null);
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

  // Show loading state
  if (postsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <CommunityNavbar onMessagesClick={handleMessagesClick} />
        <div className="container mx-auto px-4 py-10">
          <div className="text-center">
            <p className="text-lg">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  // Default grid view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CommunityNavbar onMessagesClick={handleMessagesClick} />
      
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto my-10">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts found.</p>
              <p className="text-sm text-muted-foreground mt-2">Be the first to share your travel experiences!</p>
            </div>
          ) : (
            <PostGrid 
              posts={posts} 
              onPostClick={handlePostClick}
              onAuthorClick={handleAuthorClick}
            />
          )}
        </div>
      </div>
      
      <ProfileCardModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        profile={selectedProfile}
      />
    </div>
  );
};

export default Community;