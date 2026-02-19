import { supabase } from "@/integrations/supabase/client";

export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `cms-images/${fileName}`;

  const { data, error } = await supabase.storage
    .from('cms-assets')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Upload error:', error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('cms-assets')
    .getPublicUrl(filePath);

  return publicUrl;
}
