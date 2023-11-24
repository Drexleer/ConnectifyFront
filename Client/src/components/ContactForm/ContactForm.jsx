/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost';
import ButtonBack from '../Utils/ButtonBack/ButtonBack';
import './Contact.css';
import { IoMdMail } from 'react-icons/io';
import {
  FaPhoneAlt,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${VITE_API_BASE}/contact/message`,
        formData
      );

      // Handle the response as needed
      
      window.alert('Mensaje enviado');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div style={{ marginLeft: '3em', marginTop: '3em' }}>
        <ButtonBack />
      </div>
      <h1 className="section-header">Contacto</h1>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
        }}
      >
        <form className="form" onSubmit={sendMessage}>
          <input
            name="name"
            type="text"
            className="feedback-input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />

          <input
            name="email"
            type="email"
            className="feedback-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo Electrónico"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            className="feedback-input"
            onChange={handleChange}
            placeholder="Mensaje"
            required
          ></textarea>

          <input type="submit" value="SUBMIT" />
        </form>
        <div className="direct-contact-container">
          <ul className="contact-list">
            <li className="list-item">
              <i className="fa fa-map-marker fa-2x">
                <span className="contact-text place">
                  <MdLocationOn style={{ fontSize: '1.5em' }} />
                  Argentina
                </span>
              </i>
            </li>

            <li className="list-item">
              <i className="fa fa-phone fa-2x">
                <span className="contact-text phone">
                  <FaPhoneAlt style={{ fontSize: '1.2em' }} /> +54 (911)
                  4169-0291
                </span>
              </i>
            </li>

            <li className="list-item">
              <i className="fa fa-envelope fa-2x">
                <span className="contact-text gmail">
                  <IoMdMail style={{ fontSize: '1.5em' }} />{' '}
                  connectify2023@gmail.com
                </span>
              </i>
            </li>
          </ul>

          <ul className="social-media-list">
            <li>
              <a href="#" target="_blank" className="contact-icon">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
              <FaGithub style={{ fontSize: '1.5em', marginTop: '12px' }} />
            </li>
            <li>
              <a href="#" target="_blank" className="contact-icon">
                <i className="fa fa-codepen" aria-hidden="true">
                  <FaFacebook
                    style={{ fontSize: '1.5em', marginTop: '12px' }}
                  />
                </i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="contact-icon">
                <i className="fa fa-twitter" aria-hidden="true"></i>
                <FaTwitter style={{ fontSize: '1.5em', marginTop: '12px' }} />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="contact-icon">
                <i className="fa fa-instagram" aria-hidden="true"></i>
                <FaInstagram style={{ fontSize: '1.5em', marginTop: '12px' }} />
              </a>
            </li>
          </ul>

          <div className="copyright">
            &copy;2023 Connectify | All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

{
  /* */
}
