'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface Category {
  id: string
  name: string
  slug: string
}

interface BlogCategoryFilterProps {
  categories: Category[]
}

export default function BlogCategoryFilter({ categories }: BlogCategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const handleCategoryClick = (slug: string) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (slug === 'all') {
      router.push('/blogs')
    } else {
      router.push(`/blogs?category=${slug}`)
    }
  }

  const baseClasses =
    "font-['Space_Mono'] font-normal text-[12px] md:text-[14px] uppercase tracking-[0.03em] px-3 md:px-4 py-2 border border-[#CCCCCC] cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0"

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      <button
        onClick={() => handleCategoryClick('all')}
        className={`${baseClasses} ${activeCategory === 'all' ? 'bg-[#088000] text-white border-[#088000]' : 'bg-transparent text-[#212121]'}`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryClick(cat.slug)}
          className={`${baseClasses} ${activeCategory === cat.slug ? 'bg-[#088000] text-white border-[#088000]' : 'bg-transparent text-[#212121]'}`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
