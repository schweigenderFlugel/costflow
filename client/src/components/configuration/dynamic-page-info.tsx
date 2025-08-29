"use client"
import { Suspense } from "react"
import PageInfoDialog from "@/components/shared/page-info-dialog"
import { useTabs } from "@/hooks/use-tabs"

type TabValue = "costs" | "profile" | "notifications" | "user-management" | "help"

interface TabInfoConfig {
  heading: string
  description: React.ReactNode
  content: React.ReactNode
}

const tabInfoConfigs: Record<TabValue, TabInfoConfig> = {
  costs: {
    heading: "¿De qué se trata esta sección?",
    description: (
      <>
        En esta sección podés gestionar los <strong>costos indirectos</strong> de tus productos.
      </>
    ),
    content: (
      <div className="space-y-5 pb-2">
        <h3 className="font-semibold">¿Qué son los costos indirectos?</h3>
        <ul className="list-disc space-y-5 text-sm px-6 text-muted-foreground">
          <li>Los costos indirectos son aquellos que no se pueden atribuir directamente a un producto específico, pero que son necesarios para su producción.</li>
          <li>Estos costos pueden incluir gastos generales, como alquiler, servicios públicos y salarios del personal que no está directamente involucrado en la producción.</li>
        </ul>
      </div>
    )
  },
  profile: {
    heading: "¿De qué se trata esta sección?",
    description: (
      <>
        Acá podés actualizar tu <strong>información personal</strong> y preferencias de cuenta.
      </>
    ),
    content: (
      <div className="space-y-3">
        <h3 className="font-semibold">En esta sección podés:</h3>
        <ul className="list-disc space-y-1 text-sm px-6 text-muted-foreground">
          <li><strong>Información personal:</strong> Actualizar nombre, email y datos de contacto.</li>
          <li><strong>Preferencias:</strong> Configurar opciones de visualización y comportamiento.</li>
          <li><strong>Seguridad:</strong> Cambiar contraseña y configurar autenticación.</li>
        </ul>
      </div>
    )
  },
  notifications: {
    heading: "¿De qué se trata esta sección?",
    description: (
      <>
        Controlá cómo y cuándo recibís <strong>notificaciones</strong> del sistema.
      </>
    ),
    content: (
      <div className="space-y-3">
        <h3 className="font-semibold">Tipos de notificaciones:</h3>
        <ul className="list-disc space-y-1 text-sm px-6 text-muted-foreground">
          <li><strong>Email:</strong> Notificaciones por correo electrónico.</li>
          <li><strong>En pantalla:</strong> Alertas y mensajes en la aplicación.</li>
          <li><strong>Sistema:</strong> Actualizaciones importantes y mantenimiento.</li>
        </ul>
      </div>
    )
  },
  "user-management": {
    heading: "¿De qué se trata esta sección?",
    description: (
      <>
        Acá vas a ver todos los <strong>usuarios registrados</strong> y podés manejar su estado de aprobación.
      </>
    ),
    content: (
      <div className="space-y-3">
        <h3 className="font-semibold">Cada usuario tiene su propia ficha con información clave:</h3>
        <ul className="list-disc space-y-1 text-sm px-6 text-muted-foreground">
          <li><strong>Nombre:</strong> Nombre completo del usuario.</li>
          <li><strong>Email:</strong> Correo electrónico del usuario.</li>
          <li><strong>Rol:</strong> Administrador o empleado.</li>
          <li><strong>Puesto:</strong> Área o puesto de trabajo.</li>
          <li><strong>Estado:</strong> Pendiente, aceptado o rechazado.</li>
        </ul>
      </div>
    )
  },
  help: {
    heading: "¿De qué se trata esta sección?",
    description: (
      <>
        Encontrá <strong>ayuda y documentación</strong> para usar la plataforma.
      </>
    ),
    content: (
      <div className="space-y-3">
        <h3 className="font-semibold">Recursos disponibles:</h3>
        <ul className="list-disc space-y-1 text-sm px-6 text-muted-foreground">
          <li><strong>Guías:</strong> Tutoriales paso a paso.</li>
          <li><strong>FAQ:</strong> Preguntas frecuentes.</li>
          <li><strong>Soporte:</strong> Contacto directo con el equipo.</li>
        </ul>
      </div>
    )
  }
}

const DynamicPageInfo = () => {
  const { activeTab } = useTabs()
  const config = tabInfoConfigs[activeTab]

  return (
    <Suspense>
      <PageInfoDialog
        heading={config.heading}
        description={config.description}
      >
        {config.content}
      </PageInfoDialog>
    </Suspense>
  )
}

export default DynamicPageInfo
