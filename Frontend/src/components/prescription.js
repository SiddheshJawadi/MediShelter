import React, { useState } from 'react';
import Axios from 'axios';

function MedicineField({ id, onChange }) {
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [usage, setUsage] = useState('');

  const handleMedicineNameChange = (e) => {
    setMedicineName(e.target.value);
    onChange(id, { medicineName: e.target.value, quantity, usage });
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    onChange(id, { medicineName, quantity: e.target.value, usage });
  };

  const handleUsageChange = (e) => {
    setUsage(e.target.value);
    onChange(id, { medicineName, quantity, usage: e.target.value });
  };

  return (
    <div>
      <input type="text" value={medicineName} onChange={handleMedicineNameChange} placeholder="Medicine Name" />
      <input type="number" value={quantity} onChange={handleQuantityChange} placeholder="Quantity" />
      <input type="text" value={usage} onChange={handleUsageChange} placeholder="Usage" />
    </div>
  );
}

function App() {
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [medicines, setMedicines] = useState([{ id: 1, medicineName: '', quantity: '', usage: '' }]);
  const [remarks, setRemarks] = useState('');

  const handlePatientNameChange = (e) => {
    setPatientName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMedicineChange = (id, medicine) => {
    debugger
    setMedicines((medicines) => {
      const newMedicines = [...medicines];
      newMedicines[1] = medicine;
      return newMedicines;
    });
     console.log(medicines,"medicines");
  };

  const handleAddMedicine = () => {


    setMedicines((medicines) => [...medicines, { id: medicines.length + 1, medicineName: '', quantity: '', usage: '' }]);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    console.log({ patientName, email, medicines, remarks }, 'medicine status');
      Axios.post('http://localhost:3000/form', {
        patientName:patientName,
        email:email,
        medicines:medicines[1],
        remarks:remarks,
      })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Patient Name:</label>
        <input type="text" value={patientName} onChange={handlePatientNameChange} placeholder="Patient Name" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
      </div>
      <div>
        <label>Medicine:</label>
        {medicines.map((medicine) => (
        <MedicineField key={medicine.id} id={medicine.id} onChange={handleMedicineChange} />
        ))}
        <button type="button" onClick={handleAddMedicine}>Add Medicine</button>
      </div>
      <div>
        <label>Remarks:</label>
        <textarea value={remarks} onChange={handleRemarksChange} placeholder="Remarks"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App
