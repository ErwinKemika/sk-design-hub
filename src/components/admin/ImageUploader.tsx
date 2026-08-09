import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export function ImageUploader({
  value,
  onChange,
  folder,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: "portfolio" | "articles";
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const path = `${folder}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) {
        alert(`Upload gagal: ${error.message}`);
        return;
      }
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative w-full max-w-sm">
          <img src={value} alt="" className="aspect-[4/3] w-full rounded-md object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 h-7 w-7"
            onClick={() => onChange(null)}
          >
            <X size={14} />
          </Button>
        </div>
      ) : (
        <label className="flex aspect-[4/3] w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-input text-sm text-muted-foreground hover:border-gold hover:text-gold">
          <Upload size={20} />
          {uploading ? "Mengunggah..." : "Klik untuk upload gambar"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      )}
    </div>
  );
}
