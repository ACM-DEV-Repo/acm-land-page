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

/**
 * PreviewDrawerV2 — Preview de LP inteira (drawer lateral)
 *
 * Carrega a LP inteira via iframe apontando para /l/:slug
 */
export const PreviewDrawerV2 = ({ open, onOpenChange, slug, lpName }: PreviewDrawerV2Props) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);

  const previewUrl = `/l/${slug}`;

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        hideCloseButton
        className="w-full sm:max-w-[90vw] lg:max-w-[80vw] p-0 bg-background border-l border-border overflow-hidden"
      >
        <SheetHeader className="p-4 border-b border-border bg-muted/20 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            {/* Left: Title */}
            <SheetTitle className="text-foreground text-lg font-semibold">
              Preview: {lpName || slug}
            </SheetTitle>

            {/* Center: Toggle Desktop/Mobile */}
            <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('desktop')}
                className={`rounded-md px-4 h-9 font-medium transition-all duration-200 ${
                  viewMode === 'desktop'
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/[0.06]'
                }`}
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('mobile')}
                className={`rounded-md px-4 h-9 font-medium transition-all duration-200 ${
                  viewMode === 'mobile'
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/[0.06]'
                }`}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
            </div>

            {/* Right: Refresh + Close */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/[0.06]"
                title="Atualizar preview"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/[0.06]"
                  title="Fechar preview"
                >
                  <X className="w-4 h-4" />
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetHeader>

        {/* Preview Area */}
        <div className="h-[calc(100vh-80px)] overflow-auto bg-background/80 backdrop-blur-xl flex justify-center p-6">
          <div
            className={`transition-all duration-300 h-full ${
              viewMode === 'mobile'
                ? 'w-[375px]'
                : 'w-full'
            }`}
          >
            {viewMode === 'mobile' ? (
              <div
                className="h-full flex flex-col border-[8px] border-black rounded-[3rem] shadow-2xl overflow-hidden bg-black"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 0 0 2px rgba(255,255,255,0.05)'
                }}
              >
                {/* Mobile Notch */}
                <div className="w-full h-7 bg-black flex items-center justify-center flex-shrink-0">
                  <div className="w-24 h-6 bg-black rounded-full border border-white/10" />
                </div>

                {/* Iframe */}
                <div className="flex-1 overflow-hidden bg-white">
                  <iframe
                    key={`mobile-${refreshKey}`}
                    src={previewUrl}
                    className="w-full h-full border-0"
                    title={`Preview Mobile: ${lpName || slug}`}
                  />
                </div>
              </div>
            ) : (
              /* Desktop View */
              <div className="h-full rounded-lg overflow-hidden shadow-xl">
                <iframe
                  key={`desktop-${refreshKey}`}
                  src={previewUrl}
                  className="w-full h-full border-0"
                  title={`Preview Desktop: ${lpName || slug}`}
                />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
