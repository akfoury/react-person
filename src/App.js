import './App.css';
import PersonForm from './components/PersonForm/PersonForm';
import PersonList from './components/PersonList/PersonList';
import { useEffect } from 'react';
import { getAllPerson } from "../src/api/PersonAPI";
import { connect } from "react-redux";
import { setPersonList } from './actions';

function App({ setPersonList }) {
  // Récupération de toutes les personnes au lancement de l'application
  useEffect(() => {
    getAllPerson(1, 20)
      .then(data => {
        data = data.map(obj => ({...obj, visibility: true}));
        setPersonList(data);
      });
  }, []);

  return (
    <div className="App">
      <PersonForm />
      <PersonList />
    </div>
  );
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = {
  setPersonList
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

