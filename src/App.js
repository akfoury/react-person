import './App.css';
import PersonForm from './components/PersonForm/PersonForm';
import PersonList from './components/PersonList/PersonList';
import { useState, useEffect } from 'react';
import { getAllPerson } from "../src/api/PersonAPI";

// Objet de réinitialisation du formulaire d'ajout
const initialState = {
  id: '',
  firstname: '',
  lastname: '',
  address: '',
  isActive: 'true'
}

function App() {
  // State pour stocker toutes les personnes de la base de données
  const [personList, setPersonList] = useState([]);
  // State pour stocker les informations du formulaire d'ajout
  const [formData, setFormData] = useState(initialState);

  // Récupération de toutes les personnes au lancement de l'application
  useEffect(() => {
    getAllPerson()
      .then(data => setPersonList(data));
  }, []);

  console.log(personList);
  return (
    <div className="App">
      <PersonForm setPersonList={setPersonList} setFormData={setFormData} formData={formData} style={{ backgroundColor: '#1169cf' }} initialState={initialState} />
      <PersonList setFormData={setFormData} setPersonList={setPersonList} personList={personList} />
    </div>
  );
}

export default App;
