import SEO from '../components/seo'
import Footer from '../components/footer'
import { i18n } from '../i18n'
import useAxios from '../libs/hooks/useAxios'

export default function Page({ slug }) {
  const [pageInfo, error] = useAxios(
    `${process.env.PAGE_API_URL}/${slug}?lang=${i18n.language}`
  )

  const { content, meta, title, preview_image, description } = pageInfo
    ? pageInfo?.data?.page
    : {}

  return (
    pageInfo && (
      <>
        <SEO
          title={meta.title || title}
          description={
            meta.description || description.replace(/(<([^>]+)>)/gi, '')
          }
          keywords={meta.tags}
        />
        <div className='delivery_splash'>
          {preview_image && <img src={preview_image} alt={title} />}
        </div>
        <section className='section_container'>
          <article className='delivery_content'>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className='content_block'
            ></div>
          </article>
        </section>
        <Footer />
      </>
    )
  )
}
