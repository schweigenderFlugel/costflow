import ConfigurationsTabs from "@/components/configuration/configurations-tabs"
import DynamicPageHeader from "@/components/configuration/dynamic-page-header"
import DynamicTabContent from "@/components/configuration/dynamic-tab-content"
import DynamicPageInfo from "@/components/configuration/dynamic-page-info"
import { getToken } from "@/utils/get-token"
import { fetcher } from "@/utils/fetcher"

export const metadata = {
  title: "Configuración"
}

const getIndirectCostData = async () => {
  const token = await getToken()
  if (!token) {
    return ({ error: "No estas autorizado." })
  }
  const data = await fetcher({
    input: `${process.env.SERVER_API}/indirect-costs`,
    cache: "force-cache", // Habilitar cache
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    next: {
      tags: ["indirect-costs"],
      revalidate: 300 // Revalidar cada 5 minutos automáticamente
    },
  })
  if (Array.isArray(data)) {
    return data.reverse()
  }
  return data;
}

const getUsers = async () => {
  const token = await getToken();

  if (!token) {
    return { error: "No estas autorizado." };
  }

  return await fetcher({
    input: `${process.env.SERVER_API}/users`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "force-cache",
    next: {
      tags: ["users"],
    },
  });
};


const Page = () => {
  const indirectCosts = getIndirectCostData()
  const users = getUsers()

  return (
    <main className="space-y-8 py-10">
      <ConfigurationsTabs />
      <DynamicPageHeader />
      <DynamicTabContent getIndirectCostsData={indirectCosts} getUsersData={users} />
      <DynamicPageInfo />
    </main>
  )
}

export default Page
