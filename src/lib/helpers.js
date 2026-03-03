import { supabase } from "./supabase";

// Sa helpers.js, palitan muna ng direct fetch test:
export async function uploadImage(file, bucket = "posts"){
  if(!file) return null;

  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filename = `${Date.now()}_${sanitizedName}`;
  
  console.log("uploadImage called, filename:", filename);

  try {
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type  // ✅ explicitly set content type
      });

    console.log("upload result:", error);

    if(error){
      console.error("Upload failed:", error.message);
      return null;
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filename);
    return urlData.publicUrl;
  } catch(err) {
    console.error("Upload exception:", err);
    return null;
  }
}