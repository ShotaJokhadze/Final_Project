import WhyUsSection from "../../components/WhyUs/WhyUs";
import HeroSection from "../../components/Hero/Hero";
import Testimonials from "../../components/Testimonials/Testimonials";
import { createClient } from "../../utils/supabase/server";
import { notFound } from "next/navigation";
import ProductsSection from "../../components/productsSlider/ProductsSlider";
export default async function HomePage () {
  const supabase = await createClient();
  
  const { data: testimonials, error: testimonialsError } = await supabase
    .from("testimonials")
    .select()
    .order("rating", { ascending: false })
    .limit(4);

  if (testimonialsError) {
    console.error("Error fetching testimonials:", testimonialsError);
    return notFound();
  }

  const {data: products, error: productError } = await supabase
  .from('products')
  .select('title, description, title_ge, description_ge, image, price, id, brand')
  .order('created_at', { ascending: false })
  .limit(3)

  if (productError) {
    console.error('Error fetching products', productError);
    return notFound();
  }

  return (
    <div>
      <HeroSection/>
      <ProductsSection products={products}/>
      <WhyUsSection/>
      <Testimonials testimonials={testimonials}/>
    </div>
  );
};
