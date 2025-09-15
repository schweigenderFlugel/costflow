"use client";
import PageHeaderSection from "@/components/shared/page-header-section";
import { useTabs } from "@/hooks/use-tabs";
import { TabHeaderConfig } from "@/interfaces/interface-tab-header-config";
import type { TabValue } from "@/types/type-tab-value";

const tabConfigs: Record<TabValue, TabHeaderConfig> = {
  costs: {
    title: "Configuración de Costos",
    description:
      "Ajustá los parámetros generales de tu producto. Estos valores se aplican automáticamente en los cálculos de costos de todos tus productos.",
    triggerInfo: true,
  },
  profile: {
    title: "Configuración de Perfil",
    description:
      "Administrá la información de tu perfil y preferencias de cuenta.",
    triggerInfo: true,
  },
  notifications: {
    title: "Configuración de Notificaciones",
    description: "Controlá cómo y cuándo recibís notificaciones del sistema.",
    triggerInfo: true,
  },
  "user-management": {
    title: "Gestión de Usuarios",
    description:
      "Administrá todos los usuarios, aceptá o rechazá nuevos registros y consultá su información.",
    triggerInfo: true,
  },
  help: {
    title: "Centro de Ayuda",
    description:
      "Encontrá respuestas a tus preguntas y aprende a usar la plataforma.",
    triggerInfo: true,
  },
};

const DynamicPageHeader = () => {
  const { activeTab } = useTabs();
  const config = tabConfigs[activeTab];

  return (
    <PageHeaderSection
      title={config.title}
      description={config.description}
      triggerInfo={config.triggerInfo}
    />
  );
};

export default DynamicPageHeader;
