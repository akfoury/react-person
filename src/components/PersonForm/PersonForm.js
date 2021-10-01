import React from 'react';
import './PersonForm.css';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { postFormDataAsJson } from '../../api/PersonAPI';
import { convertFormDataToObject } from '../../utils/FormData';
import { addPersonList } from "../../actions";
import { connect } from "react-redux";

function PersonForm( { addPersonList, setFormData, formData, initialState }) {
    // Mise à jour du formulaire
    const stateUpdate = target => {
        setFormData(prevState => {
            return {...prevState, [target.name]: target.value};
        });
    }
    
    // Gérer le formulaire de l'ajout d'une personne
    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { formData, url } = convertFormDataToObject(e);
            let responseData = await postFormDataAsJson({ formData, url });
            console.log(responseData);
            responseData = {...responseData, visibility: true};
            addPersonList(responseData);
            setFormData(initialState);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="personForm" action="/person" onSubmit={handleFormSubmit} style={{ backgroundColor: '#9AC2C9'}}>
            <h1 style={{paddingLeft: '24px', color: '#008080', fontWeight: '700'}}>Ajouter une Personne</h1>
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
                    style={{ borderRadius: 50 }} 
                    endIcon={<AddCircleOutlineIcon />}
                    style={{backgroundColor: '#008080' }}
                >
                    Ajouter Personne
                </Button>
            </div>
        </form>
    )
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
    addPersonList
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);