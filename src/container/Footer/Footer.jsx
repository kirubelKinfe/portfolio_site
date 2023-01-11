import './Footer.scss'
import { useState } from 'react'
import emailjs from 'emailjs-com'
import {useRef} from 'react'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'

const Footer = () => {
  const [formData, setFormData] = useState({name: '', email: '', message: ''})
  const [isFormSubmited, setIsFormSubmited] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useRef()

  const { name, email, message } = formData

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const sendEmail = (e) => {
    e.preventDefault()

    e.preventDefault();

    emailjs.sendForm('service_m2nfurv', 'template_1gm4p6u', form.current, 'yximBkZr5f8Dn2gxw')
    e.target.reset()
    
    setLoading(true)
    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact)
    .then(() => {
      setLoading(false)
      setIsFormSubmited(true)
    })
  }


  return (
    <>
      <h2 className='head-text'>Take a coffe & chat with me</h2>
      
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:kirubelkinfe01@gmail.com" className='p-text'>kirubelkinfe01@gmail.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt="email" />
          <a href="tel: +251 963 704 883" className='p-text'>+251 963 704 883</a>
        </div>
      </div>

      {!isFormSubmited ?
        <form ref={form} onSubmit={sendEmail} className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input className='p-text' type='text' placeholder='Your Name' name="name" value={name} onChange={handleChangeInput}/>
          </div>
          <div className='app__flex'>
            <input className='p-text' type='email' placeholder='Your Email' name="email" value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea
              className='p-text'
              placeholder='Your Message'
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type='submit' className='p-text'>{loading ? 'Sending' : 'Send Message'}</button>
        </form>
        : 
        <div>
          <h3 className="bold-text">Thanks for Keeping in Touch😊</h3>
        </div>
      }
        
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
)