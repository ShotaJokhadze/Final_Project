import { useTranslations } from "next-intl";
export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div className="home flex items-center">
      <h1>{t("title")}</h1>
    </div>
  );
}
