"use client"

import { useRouter } from "../../i18n/routing";


interface NavButtonProps {
  id: string | number;
  label: string;
  route: string;
}

function NavButton({ id, label, route }: NavButtonProps): JSX.Element {
  const router = useRouter();

  function handleClick() {
    router.push(`/${route}/${id}`);
  }

  return (
    <button onClick={handleClick} className="bg-mediumGray text-light py-2.5 px-2 max-w-[140px] rounded-md text-center">
      {label}
    </button>
  );
}

interface ProductButtonProps {
  id: string | number;
}

export function ProductButton({ id }: ProductButtonProps): JSX.Element {
  return <NavButton id={id} label="View Product" route="products" />;
}

interface PostsButtonProps {
  id: string | number;
}

export function PostsButton({ id }: PostsButtonProps): JSX.Element {
  return <NavButton id={id} label="Read More" route="blogs" />;
}
