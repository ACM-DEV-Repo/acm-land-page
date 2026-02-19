import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, RotateCcw, X } from "lucide-react";

interface PreviewDrawerV2Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slug: string;
  lpName?: string;
}

export const PreviewDrawerV2 = ({ open, onOpenChange, slug, lpName }: PreviewDrawerV2Props) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const previewUrl = `/l/${slug}`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[90vw] lg:max-w-[80vw] p-0 bg-background border-l border-border overflow-hidden [&>button]:hidden">
        <SheetHeader className="p-4 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-foreground text-lg font-semibold">Preview: {lpName || slug}</SheetTitle>
            <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
              <Button variant="ghost" size="sm" onClick={() => setViewMode('desktop')} className={`rounded-md px-4 h-9 font-medium ${viewMode === 'desktop' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground'}`}>
                <Monitor className="w-4 h-4 mr-2" />Desktop
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setViewMode('mobile')} className={`rounded-md px-4 h-9 font-medium ${viewMode === 'mobile' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground'}`}>
                <Smartphone className="w-4 h-4 mr-2" />Mobile
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setRefreshKey(prev => prev + 1)} className="h-9 w-9 rounded-full" title="Atualizar preview">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" title="Fechar preview"><X className="w-4 h-4" /></Button>
              </SheetClose>
            </div>
          </div>
        </SheetHeader>
        <div className="h-[calc(100vh-80px)] overflow-auto bg-background/80 flex justify-center p-6">
          <div className={`transition-all duration-300 h-full ${viewMode === 'mobile' ? 'w-[375px]' : 'w-full'}`}>
            {viewMode === 'mobile' ? (
              <div className="h-full flex flex-col border-[8px] border-black rounded-[3rem] shadow-2xl overflow-hidden bg-black">
                <div className="w-full h-7 bg-black flex items-center justify-center flex-shrink-0">
                  <div className="w-24 h-6 bg-black rounded-full border border-border/10" />
                </div>
                <div className="flex-1 overflow-hidden bg-white">
                  <iframe key={`mobile-${refreshKey}`} src={previewUrl} className="w-full h-full border-0" title={`Preview Mobile: ${lpName || slug}`} />
                </div>
              </div>
            ) : (
              <div className="h-full rounded-lg overflow-hidden shadow-xl">
                <iframe key={`desktop-${refreshKey}`} src={previewUrl} className="w-full h-full border-0" title={`Preview Desktop: ${lpName || slug}`} />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
