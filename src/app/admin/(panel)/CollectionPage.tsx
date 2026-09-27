import { ta } from "@/i18n";
import { getContent } from "@/server/store";
import type { CollectionName } from "@/types";
import { CollectionManager } from "./CollectionManager";
import { AdminHeader } from "./ui";

export async function CollectionPage({ name }: { name: CollectionName }) {
  const content = await getContent();
  const meta = ta.collections[name];
  return (
    <>
      <AdminHeader title={meta.title} description={meta.description} />
      <CollectionManager
        name={name}
        initialItems={content[name] as unknown as Record<string, unknown>[]}
        categories={content.categories}
        brands={content.brands}
      />
    </>
  );
}
