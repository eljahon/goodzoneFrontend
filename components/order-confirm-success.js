import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core'
import { withTranslation } from '../i18n'

const useStyles = makeStyles(() => ({
  btn: {
    marginRight: '15px',
    outline: 'none',
    '&:focus': {
      outline: '#fff',
    },
    '&:hover': {
      backgroundColor: 'rgb(204, 23, 23)',
    },
  },
  ctaBtn: {
    outline: 'none',
    '&:focus': {
      outline: '#fff',
    },
  },
}))

function OrderConfirmSuccess({ t, title, content, resolve }) {
  const cls = useStyles()

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAgree = async () => {
    try {
      await resolve()
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Button
        className={cls.btn}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        disableTouchRipple={true}
        variant='contained'
        color='secondary'
        onClick={handleClickOpen}
      >
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {title ? (
          <DialogTitle className='dialog-title' id='alert-dialog-title'>
            {title}
          </DialogTitle>
        ) : null}
        {content ? (
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {content}
            </DialogContentText>
          </DialogContent>
        ) : null}
        <DialogActions>
          <Button
            className={cls.ctaBtn}
            onClick={handleAgree}
            color='secondary'
            variant='contained'
            autoFocus
          >
            {t('yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default withTranslation('common')(OrderConfirmSuccess)
