import WhyUsSection from "../../components/WhyUs/WhyUs";
import HeroSection from "../../components/Hero/Hero";
import Testimonials from "../../components/Testimonials/Testimonials";
import { createClient } from "../../utils/supabase/server";
import { notFound } from "next/navigation";

// interface HomePageProps {
//   params: {
//     locale: string;
//   };
// }

export default async function HomePage () {
  const supabase = await createClient();
  
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select()
    .order("rating", { ascending: false })
    .limit(4);

  if (error) {
    console.error("Error fetching testimonials:", error);
    return notFound();
  }

  return (
    <div>
      <HeroSection/>
      <WhyUsSection/>
      <Testimonials testimonials={testimonials}/>
    </div>
  );
};
