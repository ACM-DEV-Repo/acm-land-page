import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";
import { compressImage } from "@/lib/imageOptimizer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadV2Props { value?: string; onChange: (url: string) => void; label: string; recommendedSize?: string; }

export const ImageUploadV2 = ({ value, onChange, label }: ImageUploadV2Props) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { toast.error('Selecione uma imagem válida'); return; }
    setUploading(true);
    try {
      const optimizedFile = await compressImage(file);
      const url = await uploadImage(optimizedFile);
      onChange(url);
      toast.success("Imagem enviada!");
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao fazer upload');
    } finally { setUploading(false); }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <div
        className={`relative w-[120px] h-[120px] rounded-full flex items-center justify-center border-2 border-dashed transition-all duration-300 cursor-pointer bg-muted/10 ${dragActive ? 'border-accent bg-accent/10' : 'border-border hover:border-foreground/40'} ${uploading ? 'opacity-60 cursor-wait' : ''}`}
        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" disabled={uploading} />
        {value && !uploading ? (
          <>
            <img src={value} alt="Preview" className="w-full h-full rounded-full object-cover" />
            <Button variant="destructive" size="icon" className="absolute -top-1 -right-1 w-7 h-7 rounded-full shadow-lg" onClick={(e) => { e.stopPropagation(); onChange(''); }}>
              <X className="w-3 h-3" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-2">
            <Upload className="w-5 h-5 text-muted-foreground mb-1" />
            <p className="text-[10px] text-muted-foreground leading-tight">{uploading ? 'Enviando...' : 'Clique ou arraste'}</p>
          </div>
        )}
      </div>
    </div>
  );
};
