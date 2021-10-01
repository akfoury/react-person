import './App.css';
import PersonForm from './components/PersonForm/PersonForm';
import PersonList from './components/PersonList/PersonList';
import { useState, useEffect } from 'react';
import { getAllPerson } from "../src/api/PersonAPI";
import { connect } from "react-redux";
import { setPersonList } from './actions';

// Objet de réinitialisation du formulaire d'ajout
const initialState = {
  id: '',
  firstname: '',
  lastname: '',
  address: '',
  isActive: '1'
}

function App({ personList, setPersonList }) {
  // State pour stocker les informations du formulaire d'ajout
  const [formData, setFormData] = useState(initialState);

  // Récupération de toutes les personnes au lancement de l'application
  useEffect(() => {
    getAllPerson()
      .then(data => {
        data = data.map(obj => ({...obj, visibility: true}));
        setPersonList(data);
      });
  }, []);

  return (
    <div className="App">
      <PersonForm setFormData={setFormData} formData={formData} style={{ backgroundColor: '#1169cf' }} initialState={initialState} />
      <PersonList setFormData={setFormData}  />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    personList: state.personList.personList
  }
}

const mapDispatchToProps = {
  setPersonList
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

