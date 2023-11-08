import React from 'react'
import Sidebar from '../menu/Sidebar'
import { Button } from 'react-bootstrap'

const BackTemplate = (props) => {
  return (
    <Sidebar>
        <Button variant='transparent' size='lg' className='position-fixed'> <i className='fa-solid fa-arrow-left-long'></i> </Button>
        <div className='container ml-3 d-flex'>
          {props.children}
        </div>
    </Sidebar>
  )
}

export default BackTemplate