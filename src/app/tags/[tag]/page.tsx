'use client'

import { useTagArticle } from '@/lib/article'
import page from './page.module.css'
import Article from '@/components/Article'
import { Dispatch, SetStateAction, useState } from 'react'

function FetchArticles({
  page,
  tag,
  setNext,
}: {
  tag: string
  page: number
  setNext: Dispatch<SetStateAction<boolean>>
}): any {
  const { data, isLoading, isError } = useTagArticle(tag, page)
  if (isLoading) return <h1>loading...</h1>
  if (isError) return <h1>{isError.info.message}</h1>
  if (data.length < 4) setNext(false)
  return data.map((article: any, i: number) => (
    <Article article={article} key={i} />
  ))
}

const Articles = ({ params }: { params: { tag: string } }) => {
  const [count, setCount] = useState(1)
  const [next, setNext] = useState(true)

  let list: Array<any> = []
  for (let i = 0; i < count; i++) {
    list.push(<FetchArticles tag={params.tag} page={i + 1} setNext={setNext} />)
  }

  return (
    <section className={page.section}>
      <div className={page.container}>
        <main className={page.main}>{list}</main>
        <div className={page.ads}></div>
      </div>
      {next ? (
        <button
          onClick={() => setCount(count + 1)}
          className={page.btn_load_more}
        >
          Load More
        </button>
      ) : null}
    </section>
  )
}

export default Articles
