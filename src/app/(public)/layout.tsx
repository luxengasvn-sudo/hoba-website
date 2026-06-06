import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { executeDirectQuery } from "@/lib/db-direct";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let generalConfig: any = null;
  try {
    const configData = await executeDirectQuery({
      method: "SELECT",
      table: "website_config",
      filters: [{ col: "key", val: "general" }],
      isSingle: true,
    });
    if (configData && configData.value) {
      generalConfig = configData.value;
    }
  } catch (error) {
    console.error("Error fetching general config in layout:", error);
  }

  return (
    <>
      <Header initialConfig={generalConfig} />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer initialConfig={generalConfig} />
    </>
  );
}

