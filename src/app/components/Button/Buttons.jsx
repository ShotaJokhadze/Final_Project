'use client'
import { useRouter } from 'next/navigation'

function NavButton({ id, label, route }) {
  const router = useRouter()

  function handleClick() {
    router.push(`/${route}/${id}`)
  }

  return (
    <button onClick={handleClick}>
      {label}
    </button>
  )
}

export function ProductButton({ id }) {
  return <NavButton id={id} label="View Product" route="products" />
}

export function PostsButton({ id }) {
  return <NavButton id={id} label="Read More" route="blogs" />
}