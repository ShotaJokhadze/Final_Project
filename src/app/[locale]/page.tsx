import { useTranslations } from "next-intl";
export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="home flex items-center">
      <h1>{t("HomePage.title")}</h1>
    </div>
  );
}
