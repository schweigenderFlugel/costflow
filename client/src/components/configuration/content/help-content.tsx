import Image from "next/image"

const HelpContent = () => {
  return (
    <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5 text-center space-y-6">
      <h3 className="text-2xl font-bold">Ayuda en desarrollo</h3>
      <Image
        src={"https://media.tenor.com/y-XNYFHZLgQAAAAM/homer-simpson.gif"}
        alt="homer-simpson"
        width={220}
        height={165}
        className="mx-auto"
        unoptimized
      />
      <p className="text-muted-foreground">Esta sección estará disponible próximamente</p>
    </section>
  )
}

export default HelpContent
