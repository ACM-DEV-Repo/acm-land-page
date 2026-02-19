import { useCallback } from 'react';
import {
  LPContent,
  HeroSection,
  BenefitsSection,
  PlansSection,
  TestimonialsSection,
  FaqSection,
  FooterSection,
  DesignSettings,
  SEOSettings
} from '@/lib/cms-v2/cms-types';

/**
 * Validações estruturais por seção - V2 Rigoroso
 */

const validateHero = (hero: HeroSection | undefined): string[] => {
  const errors: string[] = [];
  if (!hero) {
    errors.push("Hero: Seção não definida");
    return errors;
  }
  if (!hero.title?.trim()) errors.push("Hero: Título obrigatório");
  if (!hero.imageDesktop?.trim()) errors.push("Hero: Imagem Desktop obrigatória");
  if (!hero.imageMobile?.trim()) errors.push("Hero: Imagem Mobile obrigatória");
  if (!hero.ctaPrimary?.text?.trim()) errors.push("Hero: Texto do CTA primário obrigatório");
  if (!hero.ctaPrimary?.link?.trim()) errors.push("Hero: Link do CTA primário obrigatório");
  return errors;
};

const validateBenefits = (benefits: BenefitsSection | undefined): string[] => {
  const errors: string[] = [];
  if (!benefits || benefits.enabled === false) return errors;
  
  if (!benefits.title?.trim()) errors.push("Benefícios: Título obrigatório");
  if (!benefits.items || benefits.items.length === 0) {
    errors.push("Benefícios: Adicione pelo menos um item");
  } else {
    benefits.items.forEach((item, i) => {
      if (!item.title?.trim()) errors.push(`Benefício ${i + 1}: Título obrigatório`);
      if (!item.description?.trim()) errors.push(`Benefício ${i + 1}: Descrição obrigatória`);
    });
  }
  return errors;
};

const validatePlans = (plans: PlansSection | undefined): string[] => {
  const errors: string[] = [];
  if (!plans || plans.enabled === false) return errors;
  
  if (!plans.title?.trim()) errors.push("Planos: Título obrigatório");
  if (!plans.items || plans.items.length === 0) {
    errors.push("Planos: Adicione pelo menos um plano");
  } else {
    plans.items.forEach((item, i) => {
      if (!item.name?.trim()) errors.push(`Plano ${i + 1}: Nome obrigatório`);
      if (!item.price?.trim()) errors.push(`Plano ${i + 1}: Preço obrigatório`);
      if (!item.link?.trim()) errors.push(`Plano ${i + 1}: Link obrigatório`);
    });
  }
  return errors;
};

const validateTestimonials = (testimonials: TestimonialsSection | undefined): string[] => {
  const errors: string[] = [];
  if (!testimonials || testimonials.enabled === false) return errors;
  
  if (!testimonials.title?.trim()) errors.push("Depoimentos: Título obrigatório");
  if (!testimonials.items || testimonials.items.length === 0) {
    errors.push("Depoimentos: Adicione pelo menos um depoimento");
  } else {
    testimonials.items.forEach((item, i) => {
      if (!item.name?.trim()) errors.push(`Depoimento ${i + 1}: Nome obrigatório`);
      if (!item.text?.trim()) errors.push(`Depoimento ${i + 1}: Texto obrigatório`);
      if (item.rating < 1 || item.rating > 5) errors.push(`Depoimento ${i + 1}: Rating deve ser entre 1 e 5`);
    });
  }
  return errors;
};

const validateFaq = (faq: FaqSection | undefined): string[] => {
  const errors: string[] = [];
  if (!faq || faq.enabled === false) return errors;
  
  if (!faq.title?.trim()) errors.push("FAQ: Título obrigatório");
  if (!faq.items || faq.items.length === 0) {
    errors.push("FAQ: Adicione pelo menos uma pergunta");
  } else {
    faq.items.forEach((item, i) => {
      if (!item.question?.trim()) errors.push(`FAQ ${i + 1}: Pergunta obrigatória`);
      if (!item.answer?.trim()) errors.push(`FAQ ${i + 1}: Resposta obrigatória`);
    });
  }
  return errors;
};

const validateDesign = (design: DesignSettings | undefined): string[] => {
  const errors: string[] = [];
  if (!design) {
    errors.push("Design: Configurações não definidas");
    return errors;
  }
  if (!design.primaryColor?.trim()) errors.push("Design: Cor primária obrigatória");
  if (!design.backgroundColor?.trim()) errors.push("Design: Cor de fundo obrigatória");
  return errors;
};

const validateSEO = (seo: SEOSettings | undefined): string[] => {
  const errors: string[] = [];
  if (!seo) return errors;
  
  if (seo.metaTitle && seo.metaTitle.length > 60) {
    errors.push("SEO: Meta Title deve ter no máximo 60 caracteres");
  }
  if (seo.metaDescription && seo.metaDescription.length > 160) {
    errors.push("SEO: Meta Description deve ter no máximo 160 caracteres");
  }
  return errors;
};

const validateFooter = (footer: FooterSection | undefined): string[] => {
  const errors: string[] = [];
  if (!footer || footer.enabled === false) return errors;
  // Footer é flexível — apenas valida se ativado e tem estrutura
  return errors;
};

const validateSectionOrder = (sectionOrder: string[] | undefined): string[] => {
  const errors: string[] = [];
  if (!sectionOrder || sectionOrder.length === 0) {
    errors.push("Ordem das Seções: Defina pelo menos uma seção");
  }
  return errors;
};

/**
 * Hook de validação completa para LP V2
 */
export const useCMSValidation = () => {
  const validate = useCallback((content: LPContent) => {
    const errors: string[] = [];

    // Validação de tamanho mínimo (proteção contra corrupção)
    const jsonString = JSON.stringify(content);
    if (jsonString.length < 500) {
      errors.push("Conteúdo corrompido (tamanho mínimo não atingido)");
      return { isValid: false, errors };
    }

    // Validações estruturais por seção
    errors.push(...validateHero(content.hero));
    errors.push(...validateBenefits(content.benefits));
    errors.push(...validatePlans(content.plans));
    errors.push(...validateTestimonials(content.testimonials));
    errors.push(...validateFaq(content.faq));
    errors.push(...validateDesign(content.design));
    errors.push(...validateFooter(content.footer));
    errors.push(...validateSEO(content.seo));
    errors.push(...validateSectionOrder(content.sectionOrder));

    return {
      isValid: errors.length === 0,
      errors
    };
  }, []);

  const validateSection = useCallback(<K extends keyof LPContent>(
    sectionKey: K, 
    sectionData: LPContent[K]
  ): string[] => {
    switch (sectionKey) {
      case 'hero':
        return validateHero(sectionData as HeroSection);
      case 'benefits':
        return validateBenefits(sectionData as BenefitsSection);
      case 'plans':
        return validatePlans(sectionData as PlansSection);
      case 'testimonials':
        return validateTestimonials(sectionData as TestimonialsSection);
      case 'faq':
        return validateFaq(sectionData as FaqSection);
      case 'footer':
        return validateFooter(sectionData as FooterSection);
      case 'design':
        return validateDesign(sectionData as DesignSettings);
      case 'seo':
        return validateSEO(sectionData as SEOSettings);
      default:
        return [];
    }
  }, []);

  return { validate, validateSection };
};
