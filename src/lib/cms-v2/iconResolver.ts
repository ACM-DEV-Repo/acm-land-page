// ============================================================
// Icon Resolver V2 — Mapeia nome string → componente Lucide
// ============================================================
// Usado nos landing components pra renderizar ícones salvos no CMS.
// Backward compatible: se icon não definido, usa fallback do array antigo.
// ============================================================

import {
  Home, Leaf, Users, Clock, Shield, Sparkles,
  PhoneCall, CalendarCheck, Calendar, MapPin, Camera,
  ThumbsUp, Star, Wrench, Heart, Zap, Target,
  Award, Crown, Gem, Medal, TrendingUp, BarChart3,
  CheckCircle, Globe, Lock, Lightbulb, Rocket,
  MessageCircle, Headphones, Settings, Package,
  Truck, DollarSign, Percent, Gift, BookOpen,
  Stethoscope, Activity, Brain, Eye, Flame,
  Mountain, Sun, Wifi, Code, Cpu,
  type LucideIcon,
} from "lucide-react";

/** Mapa completo: nome string → componente Lucide */
export const ICON_MAP: Record<string, LucideIcon> = {
  // Geral
  home: Home,
  sparkles: Sparkles,
  star: Star,
  heart: Heart,
  zap: Zap,
  target: Target,
  lightbulb: Lightbulb,
  rocket: Rocket,
  flame: Flame,
  eye: Eye,
  gift: Gift,
  sun: Sun,

  // Pessoas & Social
  users: Users,
  'phone-call': PhoneCall,
  'message-circle': MessageCircle,
  headphones: Headphones,
  globe: Globe,

  // Tempo & Agenda
  clock: Clock,
  calendar: Calendar,
  'calendar-check': CalendarCheck,

  // Segurança & Confiança
  shield: Shield,
  lock: Lock,
  'check-circle': CheckCircle,
  'thumbs-up': ThumbsUp,
  award: Award,
  crown: Crown,
  gem: Gem,
  medal: Medal,

  // Negócio & Métricas
  'trending-up': TrendingUp,
  'bar-chart': BarChart3,
  'dollar-sign': DollarSign,
  percent: Percent,
  package: Package,
  truck: Truck,

  // Natureza & Saúde
  leaf: Leaf,
  mountain: Mountain,
  stethoscope: Stethoscope,
  activity: Activity,
  brain: Brain,

  // Tech
  settings: Settings,
  wifi: Wifi,
  code: Code,
  cpu: Cpu,
  'book-open': BookOpen,

  // Localização
  'map-pin': MapPin,
  camera: Camera,
};

/** Categorias para o IconPickerV2 */
export const ICON_CATEGORIES: Record<string, string[]> = {
  'Geral': ['home', 'sparkles', 'star', 'heart', 'zap', 'target', 'lightbulb', 'rocket', 'flame', 'eye', 'gift', 'sun'],
  'Pessoas': ['users', 'phone-call', 'message-circle', 'headphones', 'globe'],
  'Tempo': ['clock', 'calendar', 'calendar-check'],
  'Confiança': ['shield', 'lock', 'check-circle', 'thumbs-up', 'award', 'crown', 'gem', 'medal'],
  'Negócio': ['trending-up', 'bar-chart', 'dollar-sign', 'percent', 'package', 'truck'],
  'Saúde': ['leaf', 'mountain', 'stethoscope', 'activity', 'brain'],
  'Tech': ['settings', 'wifi', 'code', 'cpu', 'book-open'],
  'Local': ['map-pin', 'camera'],
};

/**
 * Resolve nome de ícone → componente Lucide
 * @param iconName - nome do ícone salvo no CMS (ex: "shield", "heart")
 * @param fallback - componente fallback se nome não encontrado
 */
export function resolveIcon(iconName?: string, fallback?: LucideIcon): LucideIcon {
  if (!iconName) return fallback || Sparkles;
  return ICON_MAP[iconName] || fallback || Sparkles;
}
