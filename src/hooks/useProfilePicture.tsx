import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useProfilePicture() {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const uploadProfilePicture = async (file: File, userId: string) => {
    try {
      setUploading(true);
      
      // Upload image to avatars bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/avatar.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          upsert: true // Replace existing avatar if it exists
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      toast({
        title: "Profile picture updated!",
        description: "Your new profile picture has been saved.",
      });

      return publicUrl;
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const removeProfilePicture = async (userId: string) => {
    try {
      setUploading(true);

      // Remove avatar URL from profile
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('user_id', userId);

      if (error) throw error;

      // Optional: Delete file from storage
      try {
        await supabase.storage
          .from('avatars')
          .remove([`${userId}/avatar.jpg`, `${userId}/avatar.png`, `${userId}/avatar.jpeg`]);
      } catch (storageError) {
        // Ignore storage errors as file might not exist
        console.log('Storage cleanup error (ignored):', storageError);
      }

      toast({
        title: "Profile picture removed",
        description: "Your profile picture has been removed.",
      });

      return null;
    } catch (error: any) {
      toast({
        title: "Error removing picture",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const selectFromLibrary = () => {
    fileInputRef.current?.click();
  };

  const takePhoto = () => {
    cameraInputRef.current?.click();
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
    userId: string,
    onSuccess?: (url: string | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a JPEG or PNG image.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      const url = await uploadProfilePicture(file, userId);
      onSuccess?.(url);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }

    // Reset input
    event.target.value = '';
  };

  return {
    uploading,
    fileInputRef,
    cameraInputRef,
    uploadProfilePicture,
    removeProfilePicture,
    selectFromLibrary,
    takePhoto,
    handleFileSelect,
  };
}