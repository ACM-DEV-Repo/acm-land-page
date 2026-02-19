import type { LPContent, SectionFooterCTA } from './cms-types';

const defaultFooterCta: SectionFooterCTA = {
  enabled: false,
  text: 'Quero contratar',
  link: '#plans',
  mobileHidden: false,
};

export const DEFAULT_LP_TEMPLATE: LPContent = {
  hero: { enabled: true, title: '', subtitle: '', ctaPrimary: { text: 'Contratar agora', link: '#plans' }, ctaSecondary: { text: 'Saiba mais', link: '#beneficios' }, imageDesktop: '', imageMobile: '', footerCta: { ...defaultFooterCta } },
  benefits: { enabled: true, title: '', items: [{ title: '', description: '', image: '' }, { title: '', description: '', image: '' }, { title: '', description: '', image: '' }], footerCta: { ...defaultFooterCta } },
  howItWorks: { enabled: true, title: '', steps: ['', '', ''], imageDesktop: '', imageMobile: '', footerCta: { ...defaultFooterCta } },
  beforeAfter: { enabled: false, title: '', subtitle: '', images: [{ before: '', after: '', caption: '' }], imageDesktop: '', imageMobile: '', footerCta: { ...defaultFooterCta } },
  process: { enabled: true, title: '', subtitle: '', steps: [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }], imageDesktop: '', imageMobile: '', footerCta: { ...defaultFooterCta } },
  forWhom: { enabled: false, title: '', subtitle: '', items: ['', '', '', ''], imageDesktop: '', imageMobile: '', footerCta: { ...defaultFooterCta } },
  services: { enabled: true, title: '', items: [{ text: '', enabled: true }, { text: '', enabled: true }, { text: '', enabled: true }, { text: '', enabled: true }, { text: '', enabled: true }], footerCta: { ...defaultFooterCta } },
  plans: { enabled: true, title: '', items: [{ id: 'bronze', name: 'Bronze', frequency: '', price: '', originalPrice: '', showStrikethrough: false, discount: '', supportText: '', features: ['', '', ''], ctaText: 'Contratar', link: '', recommended: false }, { id: 'silver', name: 'Prata', frequency: '', price: '', originalPrice: '', showStrikethrough: false, discount: '', supportText: '', features: ['', '', ''], ctaText: 'Contratar', link: '', recommended: false }, { id: 'gold', name: 'Ouro', frequency: '', price: '', originalPrice: '', showStrikethrough: false, discount: '', supportText: '', features: ['', '', ''], ctaText: 'Contratar', link: '', recommended: true }, { id: 'diamond', name: 'Diamante', frequency: '', price: '', originalPrice: '', showStrikethrough: false, discount: '', supportText: '', features: ['', '', ''], ctaText: 'Contratar', link: '', recommended: false }], footerCta: { ...defaultFooterCta } },
  video: { enabled: false, title: '', subtitle: '', url: '', footerCta: { ...defaultFooterCta } },
  whyChoose: { enabled: false, title: '', subtitle: '', items: [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }], imageDesktop: '', imageMobile: '', footerCta: { ...defaultFooterCta } },
  testimonials: { enabled: true, title: '', items: [{ image: '', text: '', name: '', city: '', rating: 5 }, { image: '', text: '', name: '', city: '', rating: 5 }, { image: '', text: '', name: '', city: '', rating: 5 }], footerCta: { ...defaultFooterCta } },
  videoCarousel: { enabled: false, title: '', items: [{ title: '', url: '' }], footerCta: { ...defaultFooterCta } },
  kpis: { enabled: true, items: [{ enabled: true, value: '', label: '', description: '' }, { enabled: true, value: '', label: '', description: '' }, { enabled: true, value: '', label: '', description: '' }], footerCta: { ...defaultFooterCta } },
  speakers: { enabled: false, title: '', subtitle: '', items: [], layout: 'grid', footerCta: { ...defaultFooterCta } },
  sponsors: { enabled: false, title: '', subtitle: '', tiers: [{ name: 'Diamante', enabled: true, color: '#B9F2FF', logoHeight: 'lg', items: [] }, { name: 'Ouro', enabled: true, color: '#FFD700', logoHeight: 'md', items: [] }, { name: 'Prata', enabled: true, color: '#C0C0C0', logoHeight: 'md', items: [] }, { name: 'Bronze', enabled: false, color: '#CD7F32', logoHeight: 'sm', items: [] }, { name: 'Apoio', enabled: false, color: '', logoHeight: 'sm', items: [] }], footerCta: { ...defaultFooterCta } },
  about: { enabled: true, title: '', text: '', imageDesktop: '', imageMobile: '', footerCta: { ...defaultFooterCta } },
  faq: { enabled: true, title: '', items: [{ question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }], footerCta: { ...defaultFooterCta } },
  form: { enabled: false, title: '', subtitle: '', ctaButton: 'Enviar', fields: [{ id: 'nome', type: 'text', label: 'Nome completo', placeholder: 'Seu nome', required: true, width: '100%' }, { id: 'email', type: 'email', label: 'E-mail', placeholder: 'seu@email.com', required: true, width: '50%' }, { id: 'whatsapp', type: 'whatsapp', label: 'WhatsApp', placeholder: '(00) 00000-0000', required: true, width: '50%' }], footerCta: { ...defaultFooterCta }, successAction: { type: 'toast', redirectUrl: '', successTitle: 'Enviado com sucesso!', successMessage: 'Entraremos em contato em breve.', successImage: '' }, webhookUrl: '' },
  ctaFinal: { enabled: true, title: '', subtitle: '', buttonText: 'Contratar agora', buttonLink: '#plans', imageDesktop: '', imageMobile: '', trustText: '' },
  contact: { enabled: true, title: '', subtitle: '', whatsappLink: '' },
  footer: { enabled: true, logo: '', logoDesktop: '', logoMobile: '', links: [], privacy: { text: 'Política de Privacidade', url: '', hasLink: false, enabled: true }, terms: { text: 'Termos de Uso', url: '', hasLink: false, enabled: true }, cnpj: { text: '', enabled: false }, socials: { instagram: { url: '', enabled: false }, facebook: { url: '', enabled: false }, linkedin: { url: '', enabled: false }, youtube: { url: '', enabled: false }, tiktok: { url: '', enabled: false } } },
  sectionOrder: ['hero', 'benefits', 'howItWorks', 'beforeAfter', 'process', 'forWhom', 'services', 'plans', 'video', 'whyChoose', 'testimonials', 'videoCarousel', 'kpis', 'speakers', 'sponsors', 'about', 'faq', 'form', 'ctaFinal', 'contact'],
  design: { preset: 'midnight', primaryColor: '#6366F1', secondaryColor: '#818CF8', backgroundColor: '#0F0B1A', gradient: { from: '#0F0B1A', to: '#1A1333' }, glassIntensity: 0.08, buttonColor: '#6366F1', titleColor: '#FFFFFF', borderColor: '#312E81', iconColor: '#818CF8', starColor: '#FBBF24', cardRoundness: 'medio', verticalSpacing: 'medium', fontFamily: 'Inter', textPrimaryColor: '#FFFFFF', textSecondaryColor: '#A1A1AA' },
  seo: { metaTitle: '', metaDescription: '', ogTitle: '', ogDescription: '', ogImage: '' },
  tracking: { enabled: false, meta: '', ga: '', tiktok: '', linkedin: '', gtm: '' },
  floatingWhatsapp: { enabled: false, phoneNumber: '', message: '', label: 'Fale conosco', pulseEffect: true, showOnMobile: true, showLabelOnMobile: false, stickyCta: { enabled: false, text: 'Contratar agora', link: '#plans', scrollThreshold: 600 } },
  conversion: { couponCode: '', countdown: { enabled: false, mode: 'evergreen', evergreenHours: 24, roundHourAhead: 2, label: 'OFERTA EXPIRA EM', showInPlans: true, showInCtaFinal: false, expiredText: 'Oferta expirada', urgencyColor: '' }, exitIntent: { enabled: false, title: '', text: '', ctaText: 'Aproveitar oferta', ctaLink: '#plans', dismissText: 'Não, obrigado', titleUppercase: true, frequency: 'session', delaySeconds: 3, imageUrl: '', imagePosition: 'top' }, socialProof: { enabled: false, items: [{ name: '', city: '', plan: '', timeAgo: 'há 5 minutos' }, { name: '', city: '', plan: '', timeAgo: 'há 12 minutos' }, { name: '', city: '', plan: '', timeAgo: 'há 23 minutos' }], intervalSeconds: 15, maxPerVisit: 5, position: 'bottom-left', toastDuration: 4 } },
  globalMenu: { enabled: false, logoUrl: '', links: [] },
};

export const getNewLPContent = (): LPContent => {
  return JSON.parse(JSON.stringify(DEFAULT_LP_TEMPLATE));
};