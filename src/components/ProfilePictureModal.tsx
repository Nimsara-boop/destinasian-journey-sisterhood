import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Image, Trash2, X } from "lucide-react";
import { useProfilePicture } from "@/hooks/useProfilePicture";

interface ProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: (url: string | null) => void;
}

export function ProfilePictureModal({ 
  isOpen, 
  onClose, 
  userId, 
  onSuccess 
}: ProfilePictureModalProps) {
  const {
    uploading,
    fileInputRef,
    cameraInputRef,
    selectFromLibrary,
    takePhoto,
    removeProfilePicture,
    handleFileSelect,
  } = useProfilePicture();

  const handleRemove = async () => {
    try {
      await removeProfilePicture(userId);
      onSuccess(null);
      onClose();
    } catch (error) {
      console.error('Error removing profile picture:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event, userId, (url) => {
      onSuccess(url);
      onClose();
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Change Profile Picture
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={selectFromLibrary}
              disabled={uploading}
            >
              <Image className="w-4 h-4 mr-3" />
              Choose from Library
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={takePhoto}
              disabled={uploading}
            >
              <Camera className="w-4 h-4 mr-3" />
              Take Photo
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleRemove}
              disabled={uploading}
            >
              <Trash2 className="w-4 h-4 mr-3" />
              Remove Photo
            </Button>
          </div>
          
          {uploading && (
            <div className="text-center text-sm text-muted-foreground">
              Uploading...
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}