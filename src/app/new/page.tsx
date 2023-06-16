'use client'

import page from './page.module.css'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import DOMPurify from 'dompurify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { usePostArticle } from '@/lib/article'
import { toast } from 'react-hot-toast'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

const New = () => {
  const { triggerPostArticle, postArticleError } = usePostArticle()

  const [article, setArticle] = useState({
    title: '',
    description: '',
    tag1: '',
    tag2: '',
    tag3: '',
    tag4: '',
    tag5: '',
    tag6: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setArticle(article => ({ ...article, [name]: value }))
  }

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const [convertedContent, setConvertedContent] = useState<null | string>(null)

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const markup = DOMPurify.sanitize(draftToHtml(rawContentState))
    setConvertedContent(markup)
  }, [editorState])

  console.log(convertedContent)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerPostArticle({
        body: {
          title: article.title,
          body: convertedContent,
          description: article.description,
          tags: [
            article.tag1,
            article.tag2,
            article.tag3,
            article.tag4,
            article.tag5,
            article.tag6,
          ],
        },
      })
      toast.success('Article posted')
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
          <div className={page.title}>
            <input
              type='text'
              id='title'
              name='title'
              value={article.title || ''}
              onChange={handleChange}
              placeholder='Title'
            />
          </div>
          {/*<RichTextEditor />*/}
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
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
                value={article.tag1 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
              <input
                type='text'
                id='tag2'
                name='tag2'
                value={article.tag2 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
              <input
                type='text'
                id='tag3'
                name='tag3'
                value={article.tag3 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
            </div>
            <div>
              <input
                type='text'
                id='tag4'
                name='tag4'
                value={article.tag4 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
              <input
                type='text'
                id='tag5'
                name='tag5'
                value={article.tag5 || ''}
                onChange={handleChange}
                placeholder='tag'
              />
              <input
                type='text'
                id='tag6'
                name='tag6'
                value={article.tag6 || ''}
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

export default New
