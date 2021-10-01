import React from 'react';
import { useState, useEffect } from 'react';
import './PersonList.css';
import { convertFormDataToObject } from '../../utils/FormData';
import { connect } from "react-redux";
import { 
    putFormDataAsJson, 
    deletePerson
} from '../../api/PersonAPI';
import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    IconButton,
    Grid,
    Typography,
    Button,
    Chip
} from '@mui/material';
import {
    Close,
    Send,
    Edit
} from '@mui/icons-material';
import { deletePersonList, updatePersonList } from "../../actions";
import FilterInputList from "../FilterInputList/FilterInputList";



function PersonList({ personList, deletePersonList, updatePersonList }) {
    const [editedRowIndex, setEditedRowIndex] = useState(null);

    // permet de switcher sur le mode édition d'une ligne
    const toggleIsEditing = (e) => {
        const personID = e.currentTarget.dataset.idedit;
        const editableIndex = personList.findIndex(item => parseInt(item.id) === parseInt(personID));
        setEditedRowIndex(editableIndex);
    }  
    
    // gestion du button delete
    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Récupérer l'id de la ligne
        const personID = e.currentTarget.dataset.iddelete;

        // Supprimer la personne
        const responseData = await deletePerson(personID);

        // Récuperer l'index de l'élément à supprimer
        const removeIndex = personList.findIndex(item => item.id === parseInt(personID));

        // Mettre à jour le state
        deletePersonList(removeIndex);
    }

    // Element React pour la modification d'une ligne
    const EditableRow = ({ value, name, type }) => {
        return (
            <React.Fragment>
            <div style={{ display: "flex", justifyContent: "flex-start"}}>
                <input
                    defaultValue={value}
                    name={name}
                    type={type}
                    style={{border: '#008080 solid 0.5px', width: '100%', margin: '2px'}}
                    required
                />
            </div>
            </React.Fragment>
        )
    };

    // Gérer le formulaire de la mise à jour d'une personne
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Récupérer les données du formulaire
        const personID = e.currentTarget.querySelector('button[type=submit]').dataset.idsend;
        const updateIndex = personList.findIndex(item => parseInt(item.id) === parseInt(personID));
        const url = `person/${personID}`;

        try {
            // Requête PUT
            const { formData, _} = convertFormDataToObject(e);
            let responseData = await putFormDataAsJson({ formData, url });

            responseData = {...responseData, visibility: true};
            // Mise à jour de la liste des utilisateurs
            updatePersonList(updateIndex, responseData);

            setEditedRowIndex(-1);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        document.querySelectorAll('.show').forEach((elem) => {
            elem.parentElement.style.display = "list-item";
        });

        document.querySelectorAll('.hide').forEach((elem) => {
            console.log(elem);
            elem.parentElement.style.display = "none";
        });
    }, [personList]);

    return (
        <Grid item xs={16} md={12} className="grid">
            <List className='list'>
                <ListItem className='list-item' style={{ backgroundColor: '#9AC2C980' }}>
                    <ListItemText
                        disableTypography
                        primary={<Button type="body2" style={{ fontWeight: 700, width: 10, color: '#004040' }}>ID</Button>}
                        className='list-item-text'
                    />
                    <ListItemText
                        disableTypography
                        primary={<Button type="body2" style={{ fontWeight: 700, width: 10, color: '#004040' }}>Prénom</Button>}
                        className='list-item-text'
                    />
                    <ListItemText
                        disableTypography
                        primary={<Button type="body2" style={{ fontWeight: 700, width: 10, color: '#004040' }}>Nom</Button>}
                        className='list-item-text'
                    />
                    <ListItemText
                        disableTypography
                        primary={<Button type="body2" style={{ fontWeight: 700, width: 10, color: '#004040' }}>Adresse</Button>}
                        className='list-item-text'
                    />
                    <ListItemText
                        disableTypography
                        primary={<Button type="body2" style={{ fontWeight: 700, width: 10, color: '#004040', paddingRight: 30 }}>Actif</Button>}
                        className='list-item-text'
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" type="submit">
                            <Send 
                                style={{display: "none"}} 
                            />
                        </IconButton>
                    </ListItemSecondaryAction>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" type="submit">
                            <Send 
                                style={{display: "none"}} 
                            />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <FilterInputList />
            {personList.length != 0 && personList.map((item, index) => (
                index === editedRowIndex ? ( 
                    <form className="editForm" onSubmit={handleFormSubmit}>
                        <ListItem className='list-item'>
                            <ListItemText
                                disableTypography
                                primary={<EditableRow value={item.id} name="id" />}
                                className='list-item-text personID'
                            />
                            <ListItemText
                                disableTypography
                                primary={<EditableRow value={item.firstname} name="firstname" />}
                                className='list-item-text'
                            />
                            <ListItemText
                                disableTypography
                                primary={<EditableRow value={item.lastname} name="lastname" />}
                                className='list-item-text'
                            />
                            <ListItemText
                                disableTypography
                                primary={<EditableRow value={item.address} name="address" type="email"/>}
                                className='list-item-text'
                            />
                            <ListItemText
                                disableTypography
                                primary={<EditableRow value={item.isActive} name="isActive" />}
                                className='list-item-text'
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" type="submit" data-idsend={item.id}>
                                    <Send 
                                        style={{fill: "#008080"}} 
                                    />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </form>
                    ) : (
                        <ListItem className={`list-item ${item.visibility ? "show": "hide"}`}>
                            <ListItemText
                            disableTypography
                            primary={<Typography type="body2">{item.id}</Typography>}
                            className='list-item-text personID'
                            />
                            <ListItemText
                            disableTypography
                            primary={<Typography type="body2" >{item.firstname}</Typography>}
                            className='list-item-text'
                            />
                            <ListItemText
                            disableTypography
                            primary={<Typography type="body2">{item.lastname}</Typography>}
                            className='list-item-text'
                            />
                            <ListItemText
                            disableTypography
                            primary={<Typography type="body2">{item.address}</Typography>}
                            className='list-item-text'
                            />
                            <ListItemText
                            disableTypography
                            primary={parseInt(item.isActive) ? <Chip style={{backgroundColor: 'rgba(53, 219, 94, 0.8)', color: 'white', fontWeight: 700}} label="Actif" /> : <Chip style={{backgroundColor: 'rgba(209, 42, 23, 0.8)', color: 'white', fontWeight: 700}} label="Inactif" />}
                            className='list-item-text'
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={toggleIsEditing} data-idedit={item.id} >
                                    <Edit 
                                        style={{fill: "#008080"}} 
                                    />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={handleDelete} data-iddelete={item.id}>
                                    <Close 
                                        style={{fill: "#008080"}} 
                                    />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                )
            )}
            </List>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        personList: state.personList.personList,
    }
}
const mapDispatchToProps = {
    updatePersonList,
    deletePersonList
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(PersonList);
  