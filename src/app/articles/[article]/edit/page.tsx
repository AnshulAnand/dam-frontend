'use client'

import page from '@/app/new/page.module.css'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from 'draft-js'
// import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import DOMPurify from 'dompurify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useEditArticle } from '@/lib/article'
import { toast } from 'react-hot-toast'
import { IArticle } from '@/types'
import { GET } from '@/utils/fetch'

const htmlToDraft =
  typeof window === 'object' && require('html-to-draftjs').default

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

export default async function EditArticle({ params }: { params: any }) {
  console.log({ params })

  const article: IArticle = await GET(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.article}`
  )

  console.log({ articleBody: article.body })
  console.log({ type: typeof article.body })

  const [editedArticle, setEditedArticle] = useState({
    title: article.title,
    image: article.image,
    description: article.description,
    tag1: article.tags[0],
    tag2: article.tags[1],
    tag3: article.tags[2],
    tag4: article.tags[3],
    tag5: article.tags[4],
    tag6: article.tags[5],
  })

  const [convertedContent, setConvertedContent] = useState<null | string>(null)

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(article.body)
    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    )
    const state = EditorState.createWithContent(contentState)
    setEditorState(state)
  }, [article.body])

  console.log({ editorState })

  // useEffect(() => {
  //   const rawContentState = convertToRaw(editorState.getCurrentContent())
  //   const markup = DOMPurify.sanitize(draftToHtml(rawContentState))
  //   setConvertedContent(markup)
  // }, [editorState])

  console.log(convertedContent)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setEditedArticle(prev => ({ ...prev, [name]: value }))
  }

  // Submit article
  const { triggerEditArticle, editArticleError, isEditArticleMutating } =
    useEditArticle()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result: IArticle = await triggerEditArticle({
        body: {
          title: editedArticle.title,
          body: convertedContent,
          description: editedArticle.description,
          image: editedArticle.image,
          tags: [
            editedArticle.tag1,
            editedArticle.tag2,
            editedArticle.tag3,
            editedArticle.tag4,
            editedArticle.tag5,
            editedArticle.tag6,
          ],
        },
      })
      location.assign(`${window.location.origin}/articles/${result.url}`)
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not post article')
    }
  }

  return (
    <section className={`container ${page.section}`}>
      <main className={page.main}>
        <form onSubmit={handleSubmit}>
          <div className={page.header}>
            <input
              type='text'
              id='title'
              name='title'
              value={article.title || ''}
              onChange={handleChange}
              placeholder='Title'
              required
            />
            <input
              type='text'
              id='image'
              name='image'
              value={article.image || ''}
              onChange={handleChange}
              placeholder='Cover image for the article'
              required
            />
            {article.image === '' ? null : <img src={article.image} alt='' />}
          </div>
          {/*<RichTextEditor />*/}
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            stripPastedStyles={true}
            wrapperClassName={page.wrapper_class}
            editorClassName={page.editor_class}
            toolbarClassName={page.toolbar_class}
            toolbar={{
              options: [
                'inline',
                'blockType',
                'list',
                'link',
                'embedded',
                'emoji',
                'image',
                'history',
              ],
            }}
          />
          <div className={page.tags}>
            <div>
              <input
                type='text'
                id='tag1'
                name='tag1'
                value={editedArticle.tag1 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
              <input
                type='text'
                id='tag2'
                name='tag2'
                value={editedArticle.tag2 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
              <input
                type='text'
                id='tag3'
                name='tag3'
                value={editedArticle.tag3 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
            </div>
            <div>
              <input
                type='text'
                id='tag4'
                name='tag4'
                value={editedArticle.tag4 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
              <input
                type='text'
                id='tag5'
                name='tag5'
                value={editedArticle.tag5 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
              <input
                type='text'
                id='tag6'
                name='tag6'
                value={editedArticle.tag6 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
            </div>
          </div>
          <div className={page.description}>
            <input
              type='text'
              id='description'
              name='description'
              value={article.description || ''}
              placeholder='Description (optional)'
              onChange={handleChange}
            />
          </div>
          <div className={page.btn_container}>
            <button type='submit'>Submit</button>
            <button className={page.cancel_btn}>Cancel</button>
          </div>
        </form>
      </main>
    </section>
  )
}
