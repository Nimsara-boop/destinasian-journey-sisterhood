import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function usePostUpload() {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadPost = async (file: File, caption?: string, location?: string) => {
    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Upload image to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-photos')
        .getPublicUrl(fileName);

      // Create post in database
      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          image_url: publicUrl,
          content: caption || '',
          location: location || null
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Post uploaded successfully!",
        description: "Your post is now visible on your profile.",
      });

      return data;
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

  return { uploadPost, uploading };
}