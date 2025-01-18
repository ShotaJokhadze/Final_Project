'use client'
import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations('HomePage'); // Get translations

  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
};

export default HomePage;
