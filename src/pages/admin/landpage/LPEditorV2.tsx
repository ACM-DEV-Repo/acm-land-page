import { useParams } from "react-router-dom";
import { useAdminEditorV2Production } from "@/hooks/cms/useAdminEditorV2Production";
import { AdminPageContainer } from "@/components/admin/layout/AdminPageContainer";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { SaveStatusHUDV2 } from "@/components/admin/shared-v2/SaveStatusHUDV2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HeroEditorV2, BenefitsEditorV2, HowItWorksEditorV2, BeforeAfterEditorV2, ProcessEditorV2,
  ForWhomEditorV2, ServicesEditorV2, PlansEditorV2, VideoEditorV2, VideoCarouselEditorV2,
  WhyChooseEditorV2, TestimonialsEditorV2, AboutEditorV2, FAQEditorV2, CTAFinalEditorV2,
  ContactEditorV2, KPIsEditorV2, FooterEditorV2, FormEditorV2, TrackingEditorV2,
  SEOEditorV2, DesignEditorV2, SectionOrderEditorV2, FloatingWhatsappEditorV2,
  ConversionEditorV2, GlobalMenuEditorV2, SpeakersEditorV2, SponsorsEditorV2
} from "@/components/admin/sections-v2";

const sectionTabs = [
  { key: 'hero', label: 'Hero' }, { key: 'benefits', label: 'Benefícios' }, { key: 'howItWorks', label: 'Como Funciona' },
  { key: 'beforeAfter', label: 'Antes/Depois' }, { key: 'process', label: 'Processo' }, { key: 'forWhom', label: 'Para Quem' },
  { key: 'services', label: 'Serviços' }, { key: 'plans', label: 'Planos' }, { key: 'video', label: 'Vídeo' },
  { key: 'videoCarousel', label: 'Vídeos' }, { key: 'whyChoose', label: 'Por Que' }, { key: 'testimonials', label: 'Depoimentos' },
  { key: 'kpis', label: 'KPIs' }, { key: 'about', label: 'Sobre' }, { key: 'faq', label: 'FAQ' },
  { key: 'ctaFinal', label: 'CTA Final' }, { key: 'contact', label: 'Contato' }, { key: 'form', label: 'Formulário' },
  { key: 'speakers', label: 'Palestrantes' }, { key: 'sponsors', label: 'Patrocinadores' }, { key: 'footer', label: 'Rodapé' },
  { key: 'design', label: 'Design' }, { key: 'seo', label: 'SEO' }, { key: 'tracking', label: 'Tracking' },
  { key: 'order', label: 'Ordem' }, { key: 'whatsapp', label: 'WhatsApp' }, { key: 'conversion', label: 'Conversão' },
  { key: 'globalMenu', label: 'Menu' },
];

export default function LPEditorV2() {
  const { lpKey } = useParams<{ lpKey: string }>();
  const { draft, isDirty, isLoading, saveStatus, saveNow, updateField, updateNestedField, updateSection } = useAdminEditorV2Production(lpKey!);

  if (isLoading || !draft) return <div className="flex items-center justify-center h-screen"><p className="text-muted-foreground">Carregando editor...</p></div>;

  const props = { draft, lpKey: lpKey!, updateField, updateNestedField, updateSection };

  const renderEditor = (key: string) => {
    switch (key) {
      case 'hero': return <HeroEditorV2 {...props} />;
      case 'benefits': return <BenefitsEditorV2 {...props} />;
      case 'howItWorks': return <HowItWorksEditorV2 {...props} />;
      case 'beforeAfter': return <BeforeAfterEditorV2 {...props} />;
      case 'process': return <ProcessEditorV2 {...props} />;
      case 'forWhom': return <ForWhomEditorV2 {...props} />;
      case 'services': return <ServicesEditorV2 {...props} />;
      case 'plans': return <PlansEditorV2 {...props} />;
      case 'video': return <VideoEditorV2 {...props} />;
      case 'videoCarousel': return <VideoCarouselEditorV2 {...props} />;
      case 'whyChoose': return <WhyChooseEditorV2 {...props} />;
      case 'testimonials': return <TestimonialsEditorV2 {...props} />;
      case 'kpis': return <KPIsEditorV2 {...props} />;
      case 'about': return <AboutEditorV2 {...props} />;
      case 'faq': return <FAQEditorV2 {...props} />;
      case 'ctaFinal': return <CTAFinalEditorV2 {...props} />;
      case 'contact': return <ContactEditorV2 {...props} />;
      case 'form': return <FormEditorV2 {...props} />;
      case 'speakers': return <SpeakersEditorV2 {...props} />;
      case 'sponsors': return <SponsorsEditorV2 {...props} />;
      case 'footer': return <FooterEditorV2 {...props} />;
      case 'design': return <DesignEditorV2 {...props} />;
      case 'seo': return <SEOEditorV2 {...props} />;
      case 'tracking': return <TrackingEditorV2 {...props} />;
      case 'order': return <SectionOrderEditorV2 {...props} />;
      case 'whatsapp': return <FloatingWhatsappEditorV2 {...props} />;
      case 'conversion': return <ConversionEditorV2 {...props} />;
      case 'globalMenu': return <GlobalMenuEditorV2 {...props} />;
      default: return null;
    }
  };

  return (
    <AdminPageContainer type="editor">
      <AdminPageHeader title="Editor LP" description={lpKey} />
      <SaveStatusHUDV2 status={saveStatus} lastSaved={null} />
      <Tabs defaultValue="hero" className="mt-4">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent">
          {sectionTabs.map(t => (<TabsTrigger key={t.key} value={t.key} className="text-xs">{t.label}</TabsTrigger>))}
        </TabsList>
        {sectionTabs.map(t => (<TabsContent key={t.key} value={t.key}>{renderEditor(t.key)}</TabsContent>))}
      </Tabs>
    </AdminPageContainer>
  );
}
