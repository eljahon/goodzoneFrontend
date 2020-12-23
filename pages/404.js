// import { withTranslation } from '../i18n'
import SEO from '../components/seo'

function Custom404() {
  return (
    <>
      <div className='container-fluid bg-danger notfound_not d-flex align-items-center justify-content-center'>
        <div>
          <div className='notfound'>
            <div className='notfound-404 col-md-12'>
              <h1 className='text-center'>404</h1>
            </div>
            <div className='col-md-12 mt-4 notfound_text'>
              {/* <h2 className='text-center text-white'>{t('not-found-text')}</h2> */}
            </div>
            <div className='col-md-12 text-center mt-5 notfound_home'>
              <a href='/' className='btn  btn-outline-light '>
                {/* {t('go-home')} */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Custom404
