import type { Metadata } from "next";
import { ta } from "@/i18n";
import { getSettings } from "@/server/store";
import { AdminHeader } from "../ui";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <>
      <AdminHeader title={ta.settings.title} description={ta.settings.intro} />
      <SettingsForm initial={settings} />
    </>
  );
}
