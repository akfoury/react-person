import React from 'react';
import './PersonForm.css';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { postFormDataAsJson } from '../../api/PersonAPI';
import { convertFormDataToObject } from '../../utils/FormData';
import { addPersonList, setFormData } from "../../actions";
import { connect } from "react-redux";

// Objet de réinitialisation du formulaire d'ajout
const initialFormData = {
    id: '',
    firstname: '',
    lastname: '',
    address: '',
    isActive: '1'
}

function PersonForm( { addPersonList, formData, setFormData }) {
    // Mise à jour du formulaire
    const stateUpdate = target => {
        setFormData(target.name, target.value);
    }
    
    // Gérer le formulaire de l'ajout d'une personne
    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { formData, url } = convertFormDataToObject(e);
            let responseData = await postFormDataAsJson({ formData, url });

            responseData = {...responseData, visibility: true};
            addPersonList(responseData);
            setFormData(initialFormData);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="personForm" action="/person" onSubmit={handleFormSubmit}>
            <h1>Ajouter une Personne</h1>
            <div className="personForm__item">
                <label>Prénom</label>
                <input type="text" placeholder="Votre prénom" value={formData.firstname} name="firstname" onChange={e => stateUpdate(e.target)} required />
            </div>
            <div className="personForm__item">
                <label>Nom</label>
                <input type="text" placeholder="Votre nom de famille" value={formData.lastname} name="lastname" onChange={e => stateUpdate(e.target)} required />
            </div>
            <div className="personForm__item">
                <label>Adresse Email</label>
                <input type="email" placeholder="-----@-----.---" value={formData.address} name="address" onChange={e => stateUpdate(e.target)} required />
            </div>
            <div className="personForm__item">
                <label>Actif</label>
                <select onChange={e => stateUpdate(e.target)} value={formData.isActive} name="isActive">
                    <option value="1">Oui</option>
                    <option value="0">Non</option>
                </select>
            </div>
            <div className="personForm__item">
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    value="Ajouter Personne"
                    endIcon={<AddCircleOutlineIcon />}
                >
                    Ajouter Personne
                </Button>
            </div>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        formData: state.formData.formData
    }
}
const mapDispatchToProps = {
    addPersonList,
    setFormData
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);