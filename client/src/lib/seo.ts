/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';


export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  canonical?: string;
}
const defaultConfig: Required<Omit<SEOConfig, 'noIndex' | 'canonical'>> = {
  title: 'Cotzia - Calculadora de Costos y Presupuestos',
  description: 'Herramienta profesional para calcular costos de producción, gestionar insumos y crear presupuestos precisos para tu negocio.',
  keywords: [
    'calculadora de costos',
    'presupuestos',
    'gestión de insumos',
    'costos de producción',
    'calculadora empresarial',
    'análisis de costos',
    'presupuesto empresarial',
    'cotizaciones',
    'gestión de productos',
    'control de costos'
  ],
  image: '/assets/images/cotzia-og.jpg',
  url: 'https://cotzia.vercel.app',
  type: 'website'
};

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const {
    title = defaultConfig.title,
    description = defaultConfig.description,
    keywords = defaultConfig.keywords,
    image = defaultConfig.image,
    url = defaultConfig.url,
    type = defaultConfig.type,
    noIndex = false,
    canonical
  } = config;

  const fullTitle = title === defaultConfig.title ? title : `${title} | Cotzia`;
  const fullUrl = url.startsWith('http') ? url : `${defaultConfig.url}${url}`;
  const fullImage = image.startsWith('http') ? image : `${defaultConfig.url}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),

    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: 'Cotzia',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'es_AR',
      type,
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
      creator: '@cotzia',
      site: '@cotzia',
    },

    // Additional metadata
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },

    // Canonical URL
    alternates: canonical ? {
      canonical: canonical
    } : undefined,

    // App-specific metadata
    applicationName: 'Cotzia',
    category: 'Business',
    classification: 'Business Tool',

    // Additional meta tags
    other: {
      'theme-color': '#0a0559',
    }
  };

  return metadata;
}

// Predefined metadata for common pages
export const pageMetadata = {
  home: (): Metadata => generateMetadata({
    title: 'Cotzia - Calculadora de Costos y Presupuestos',
    description: 'Herramienta profesional para calcular costos de producción, gestionar insumos y crear presupuestos precisos para tu negocio.',
    url: '/',
    keywords: [
      'calculadora de costos',
      'presupuestos online',
      'gestión empresarial',
      'costos de producción',
      'calculadora empresarial',
      'herramientas de negocio'
    ]
  }),

  dashboard: (): Metadata => generateMetadata({
    title: 'Panel de Control',
    description: 'Visualiza y gestiona tus productos, insumos y estadísticas de producción en tiempo real.',
    url: '/inicio',
    keywords: [
      'dashboard empresarial',
      'panel de control',
      'estadísticas de producción',
      'gestión de inventario',
      'análisis de negocio'
    ]
  }),

  calculator: (): Metadata => generateMetadata({
    title: 'Calculadora de Costos',
    description: 'Calcula costos de producción precisos con nuestra herramienta avanzada. Incluye insumos, mano de obra y costos indirectos.',
    url: '/calculadora',
    keywords: [
      'calculadora de costos',
      'cálculo de precios',
      'costos de producción',
      'presupuesto de productos',
      'análisis de rentabilidad'
    ]
  }),

  products: (): Metadata => generateMetadata({
    title: 'Gestión de Productos',
    description: 'Administra tu catálogo de productos, precios y características. Optimiza tu inventario y aumenta la rentabilidad.',
    url: '/productos',
    keywords: [
      'gestión de productos',
      'catálogo de productos',
      'inventario',
      'administración de stock',
      'control de productos'
    ]
  }),

  feedstock: (): Metadata => generateMetadata({
    title: 'Gestión de Insumos',
    description: 'Controla tus insumos y materias primas. Mantén actualizado tu inventario y optimiza los costos de producción.',
    url: '/insumos',
    keywords: [
      'gestión de insumos',
      'materias primas',
      'control de inventario',
      'stock de insumos',
      'administración de materiales'
    ]
  }),

  configuration: (): Metadata => generateMetadata({
    title: 'Configuración',
    description: 'Personaliza tu experiencia en Cotzia. Ajusta configuraciones de usuario, empresa y preferencias del sistema.',
    url: '/configuracion',
    keywords: [
      'configuración',
      'ajustes de usuario',
      'personalización',
      'preferencias del sistema',
      'configuración empresarial'
    ],
    noIndex: true
  }),

  login: (): Metadata => generateMetadata({
    title: 'Iniciar Sesión',
    description: 'Accede a tu cuenta de Cotzia para gestionar tus costos y presupuestos empresariales.',
    url: '/inicio-de-sesion',
    keywords: [
      'iniciar sesión',
      'login',
      'acceso a cuenta',
      'autenticación'
    ],
    noIndex: true
  }),

  register: (): Metadata => generateMetadata({
    title: 'Crear Cuenta',
    description: 'Regístrate en Cotzia y comienza a gestionar los costos de tu negocio de manera profesional.',
    url: '/registro',
    keywords: [
      'registro',
      'crear cuenta',
      'sign up',
      'nueva cuenta'
    ]
  }),

  forgotPassword: (): Metadata => generateMetadata({
    title: 'Recuperar Contraseña',
    description: 'Recupera el acceso a tu cuenta de Cotzia de forma segura.',
    url: '/olvide-mi-contrasena',
    noIndex: true
  }),

  changePassword: (): Metadata => generateMetadata({
    title: 'Cambiar Contraseña',
    description: 'Actualiza tu contraseña de forma segura.',
    url: '/cambiar-contrasena',
    noIndex: true
  })
};

// JSON-LD structured data generator
export function generateJsonLd(type: 'WebSite' | 'Organization' | 'WebApplication', data?: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type
  };

  switch (type) {
    case 'WebSite':
      return {
        ...baseData,
        name: 'Cotzia',
        description: 'Herramienta profesional para calcular costos de producción y crear presupuestos empresariales',
        url: 'https://cotzia.vercel.app',
        ...data
      };

    case 'Organization':
      return {
        ...baseData,
        name: 'Cotzia',
        description: 'Herramienta profesional para cálculo de costos empresariales',
        url: 'https://cotzia.vercel.app',
        logo: 'https://cotzia.vercel.app/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+54-11-1234-5678',
          contactType: 'customer service',
          areaServed: 'AR',
          availableLanguage: 'Spanish'
        },
        sameAs: [
          'https://twitter.com/cotzia',
          'https://linkedin.com/company/cotzia',
          'https://facebook.com/cotzia'
        ],
        ...data
      };

    case 'WebApplication':
      return {
        ...baseData,
        name: 'Cotzia',
        description: 'Calculadora de costos y presupuestos empresariales',
        url: 'https://cotzia.vercel.app',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        ...data
      };

    default:
      return baseData;
  }
}
