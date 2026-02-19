import { useCallback } from 'react';
import { LPContent, HeroSection, BenefitsSection, PlansSection, TestimonialsSection, FaqSection, FooterSection, DesignSettings, SEOSettings } from '@/lib/cms-v2/cms-types';

const validateHero = (h: HeroSection | undefined): string[] => { const e: string[] = []; if (!h) return ['Hero: Seção não definida']; if (!h.title?.trim()) e.push('Hero: Título obrigatório'); return e; };
const validateBenefits = (b: BenefitsSection | undefined): string[] => { if (!b || b.enabled === false) return []; const e: string[] = []; if (!b.title?.trim()) e.push('Benefícios: Título obrigatório'); return e; };
const validatePlans = (p: PlansSection | undefined): string[] => { if (!p || p.enabled === false) return []; const e: string[] = []; if (!p.title?.trim()) e.push('Planos: Título obrigatório'); return e; };
const validateDesign = (d: DesignSettings | undefined): string[] => { if (!d) return ['Design: Configurações não definidas']; const e: string[] = []; if (!d.primaryColor?.trim()) e.push('Design: Cor primária obrigatória'); return e; };

export const useCMSValidation = () => {
  const validate = useCallback((content: LPContent) => {
    const errors: string[] = [];
    const json = JSON.stringify(content);
    if (json.length < 500) { errors.push('Conteúdo corrompido'); return { isValid: false, errors }; }
    errors.push(...validateHero(content.hero), ...validateBenefits(content.benefits), ...validatePlans(content.plans), ...validateDesign(content.design));
    return { isValid: errors.length === 0, errors };
  }, []);
  return { validate };
};