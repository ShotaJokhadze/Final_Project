export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  title_ge?: string;
  description_ge?: string;
  image: string;
}
