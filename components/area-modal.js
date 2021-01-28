import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withTranslation } from '../i18n'
import { FormControl, NativeSelect } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: '70%',
  },
}))
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      backgroundColor: '#fff',
      borderRadius: 4,
      borderColor: '#f5363e',
      boxShadow: 'none',
    },
  },
}))(InputBase)

function AreaModal({ closeModal, goRegister, customer, t, isArea, setRegion }) {
  const [load, setLoad] = useState(false)

  const [city, setCity] = useState(t('area-tashkent'))
  const [error, setError] = useState()
  const [submit, isSubmit] = useState(false)

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  useEffect(() => {
    setLoad(true)
    document.body.classList.add('overflow')
    return () => {
      setLoad(false)
      document.body.classList.remove('overflow')
    }
  })

  const handleSubmit = async (e) => {
    isSubmit(true)
    e.preventDefault()

    try {
      const response = await axios.patch(
        `${process.env.AREA_API_URL}/${customer}`,
        {
          area: city,
        }
      )
      if (response.status === 201) {
        isArea(false)
        localStorage.setItem('region', city)
      }
    } catch (error) {
      setError('Error')
    } finally {
      isSubmit(false)
      location.reload()
    }
  }
  const classes = useStyles()
  return (
    <div className='login_modal-wrapper'>
      <div className={`login_modal-holder ${load ? 'show' : ''}`}>
        <div className='inner_block'>
          <div className='auth_form'>
            <div className='auth_form-container pb-4'>
              <h3>{t('welcome')}</h3>
              <span className='sub_heading'>{t('area-title')}</span>
              <p className='text-danger'>{error}</p>
              <form>
                <div className='select-menu'>
                  <FormControl variant='outlined' className={classes.margin}>
                    <NativeSelect
                      input={<BootstrapInput />}
                      defaultValue={city}
                      onChange={handleChange}
                    >
                      <option value={t('area-samarkand')}>
                        {t('area-samarkand')}
                      </option>
                      <option value={t('area-tashkent')}>
                        {t('area-tashkent')}
                      </option>
                    </NativeSelect>
                  </FormControl>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submit}
                  className='btn btn_submit'
                >
                  {t('submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default withTranslation('common')(AreaModal)
