import React from 'react';
import { useState, useEffect } from 'react';
import './PersonList.css';
import $ from "jquery";
import Scrollbars from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import { putFormDataAsJson, deletePerson } from '../../api/PersonAPI';
import { convertFormDataToObject } from '../../utils/FormData';
import { getListOfFilteredID } from '../../utils/ListFilter';


// Initialisation des valeurs de filtres
const initialFilteredPerson = {
    id: '',
    firstname: '',
    lastname: '',
    address: '',
    isActive: ''
}

export default function PersonList({ setPersonList, personList }) {
    const classes = useStyles();
    const [editedRowIndex, setEditedRowIndex] = useState(null);
    const [filterOptions, setFilterOptions]  = useState(initialFilteredPerson);
    const [filteredListPerson, setFilteredListPerson] = useState([]);

    // Gestion du state stockant les valeurs de filtrage
    const handleFormFilterInput = (e) => {
        const { value, name } = e.target;
        setFilterOptions(prevState => {
            return {...prevState, [name]: value}
        });
    }

    // permet de switcher sur le mode édition d'une ligne
    const toggleIsEditing = (e) => {
        if ($(e.currentTarget).attr('class').includes('editableIcon')) {
            const personID = $($(e.currentTarget).parents()[3]).find('.personID').text();
            const editableIndex = personList.findIndex(item => parseInt(item.id) === parseInt(personID));
            setEditedRowIndex(editableIndex);
        }
    }   

    // Element React pour la modification d'une ligne
    const EditableRow = ({ value, name, type, lastRow }) => {
        return (
            <React.Fragment>
            <div style={{ display: "flex", justifyContent: "flex-start", width: lastRow ? '70%' : '100%' }}>
                <input
                    className={`MuiTypography-root MuiTypography-h7 MuiTypography-displayInline`}
                    defaultValue={value}
                    name={name}
                    type={type}
                    style={{border: '#008080 solid 0.5px', width: '100%', margin: '2px'}}
                />
            </div>
            </React.Fragment>
        )
    };

    // Gérer le formulaire de la mise à jour d'une personne
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Récupérer les données du formulaire
        const personID = $(e.currentTarget).find('.personID').find('input').attr('value');
        const updateIndex = personList.findIndex(item => parseInt(item.id) === parseInt(personID));
        const url = `person/${personID}`;

        try {
            // Requête PUT
            const { formData, _} = convertFormDataToObject(e);
            let responseData = await putFormDataAsJson({ formData, url });
            console.log(responseData);

            // Mise à jour de la liste des utilisateurs
            setPersonList(prevState => {
                return  [...prevState.slice(0, updateIndex), responseData, ...prevState.slice(updateIndex + 1)];
            });

            setEditedRowIndex(-1);
        } catch (error) {
            console.error(error);
        }
    }

    // Initialisation du state stockant la liste filtrée
    useEffect(() => {
        setFilteredListPerson(personList);
    }, [personList]);

    // Appel à l'algorithme à chaque fois qu'une valeur de filtrage change
    useEffect(() => {
        const filteredID = getListOfFilteredID(filterOptions, personList);
        console.log(typeof(filteredID[0]))
        if (filteredID.length != 0) {
            setFilteredListPerson(personList.filter((item, index) => filteredID.includes(String(item.id))));
        }
    }, [filterOptions]);

    console.log(filteredListPerson);

    return (
        <>
        <Scrollbars style={{ width: '70%', height: '100%' }} renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}>
          <Grid item xs={16} md={12}>
              <List className={classes.List}>
                    <ListItem className={classes.listItem} style={{ backgroundColor: '#9AC2C980' }}>
                        <ListItemText
                            disableTypography
                            primary={<Typography type="body2" style={{ fontWeight: 700, width: 10, color: '#004040' }}>ID</Typography>}
                            className={classes.listItemText}
                        />
                        <ListItemText
                            disableTypography
                            primary={<Typography type="body2" style={{ fontWeight: 700, width: 10, color: '#004040' }}>Prénom</Typography>}
                            className={classes.listItemText}
                        />
                        <ListItemText
                            disableTypography
                            primary={<Typography type="body2" style={{ fontWeight: 700, width: 10, color: '#004040' }}>Nom</Typography>}
                            className={classes.listItemText}
                        />
                        <ListItemText
                            disableTypography
                            primary={<Typography type="body2" style={{ fontWeight: 700, width: 10, color: '#004040' }}>Adresse</Typography>}
                            className={classes.listItemText}
                        />
                        <ListItemText
                            disableTypography
                            primary={<Typography type="body2" style={{ fontWeight: 700, width: 10, color: '#004040', paddingRight: 30 }}>Actif</Typography>}
                            className={classes.listItemText}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" type="submit">
                                <SendIcon 
                                    style={{display: "none"}} 
                                />
                            </IconButton>
                        </ListItemSecondaryAction>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" type="submit">
                                <SendIcon 
                                    style={{display: "none"}} 
                                />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <form className="filterForm">
                        <ListItem className={classes.listItem}>
                            <ListItemText
                                disableTypography
                                primary={
                                <div style={{ display: "flex", justifyContent: "flex-start", width: '100%' }}>
                                    <input
                                        className="MuiTypography-root MuiTypography-h7 MuiTypography-displayInline"
                                        defaultValue={filterOptions["id"]}
                                        onChange={handleFormFilterInput}
                                        name={"id"}
                                        style={{border: '#008080 solid 0.5px', width: '100%', margin: '2px'}}
                                        placeholder="Filtrer"
                                    />
                                </div>}
                                className={classes.listItemText} 
                            />
                            <ListItemText
                                disableTypography
                                primary={
                                <div style={{ display: "flex", justifyContent: "flex-start", width: '100%' }}>
                                    <input
                                        className="MuiTypography-root MuiTypography-h7 MuiTypography-displayInline"
                                        defaultValue={filterOptions["firstname"]}
                                        onChange={handleFormFilterInput}
                                        name={"firstname"}
                                        style={{border: '#008080 solid 0.5px', width: '100%', margin: '2px'}}
                                        placeholder="Filtrer"
                                    />
                                </div>}
                                className={classes.listItemText}
                            />
                            <ListItemText
                                disableTypography
                                primary={
                                <div style={{ display: "flex", justifyContent: "flex-start", width: '100%' }}>
                                    <input
                                        className="MuiTypography-root MuiTypography-h7 MuiTypography-displayInline"
                                        defaultValue={filterOptions["lastname"]}
                                        onChange={handleFormFilterInput}
                                        name={"lastname"}
                                        style={{border: '#008080 solid 0.5px', width: '100%', margin: '2px'}}
                                        placeholder="Filtrer"
                                    />
                                </div>}
                                className={classes.listItemText}
                            />
                            <ListItemText
                                disableTypography
                                primary={
                                <div style={{ display: "flex", justifyContent: "flex-start", width: '100%' }}>
                                    <input
                                        className="MuiTypography-root MuiTypography-h7 MuiTypography-displayInline"
                                        defaultValue={filterOptions["address"]}
                                        onChange={handleFormFilterInput}
                                        name={"address"}
                                        style={{border: '#008080 solid 0.5px', width: '100%', margin: '2px'}}
                                        placeholder="Filtrer"    
                                    />
                                </div>}
                                className={classes.listItemText}
                            />
                            <ListItemText
                                disableTypography
                                primary={
                                <div style={{ display: "flex", justifyContent: "flex-start", width: '70%' }}>
                                    <input
                                        className="MuiTypography-root MuiTypography-h7 MuiTypography-displayInline"
                                        defaultValue={filterOptions["isActive"]}
                                        onChange={handleFormFilterInput}
                                        name={"isActive"}
                                        style={{border: '#008080 solid 0.5px', width: '100%', margin: '2px'}}
                                        placeholder="Filtrer"
                                    />
                                </div>}
                                className={classes.listItemText}
                            />
                        </ListItem>
                    </form>
                {filteredListPerson.map((item, index) => (
                    index === editedRowIndex ? ( 
                        <form className="editForm" onSubmit={handleFormSubmit}>
                            <ListItem className={classes.listItem}>
                                <ListItemText
                                    disableTypography
                                    primary={<EditableRow value={item.id} name={"id"}/>}
                                    className={`${classes.listItemText} personID`}
                                />
                                <ListItemText
                                    disableTypography
                                    primary={<EditableRow value={item.firstname} name={"firstname"} />}
                                    className={classes.listItemText}
                                />
                                <ListItemText
                                    disableTypography
                                    primary={<EditableRow value={item.lastname} name={"lastname"} />}
                                    className={classes.listItemText}
                                />
                                <ListItemText
                                    disableTypography
                                    primary={<EditableRow value={item.address} name={"address"} type={"email"}/>}
                                    className={classes.listItemText}
                                />
                                <ListItemText
                                    disableTypography
                                    primary={<EditableRow value={item.isActive} name={"isActive"} lastRow={true} />}
                                    className={classes.listItemText}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" type="submit">
                                        <SendIcon 
                                            style={{fill: "#008080"}} 
                                        />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                       </form>
                        ) : (
                    <ListItem className={classes.listItem}>
                            <ListItemText
                            disableTypography
                            primary={<Typography type="body2">{item.id}</Typography>}
                            className={`${classes.listItemText} personID`}
                            />
                            <ListItemText
                            disableTypography
                            primary={<Typography type="body2" >{item.firstname}</Typography>}
                            className={classes.listItemText}
                            />
                            <ListItemText
                            disableTypography
                            primary={<Typography type="body2">{item.lastname}</Typography>}
                            className={classes.listItemText}
                            />
                            <ListItemText
                            disableTypography
                            primary={<Typography type="body2">{item.address}</Typography>}
                            className={classes.listItemText}
                            />
                            <ListItemText
                            disableTypography
                            primary={<Typography type="body2">{item.isActive ? '1' : '0'}</Typography>}
                            className={classes.listItemText}
                            />
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit">
                            <EditIcon 
                                style={{fill: "#008080"}} 
                                onClick={toggleIsEditing}
                                className="editableIcon" 
                            />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <CloseIcon 
                                style={{fill: "#008080"}} 
                                onClick={(e) => {
                                    const personID = $($(e.currentTarget).parents()[3]).find('.personID').text();
                                    deletePerson(e, personID).then(() => {
                                        // Récuperer l'index de l'élément à supprimer
                                        const removeIndex = personList.findIndex(item => item.id === parseInt(personID));
                                    
                                        // Faire une copie du state
                                        const newArray = [...personList];
                                    
                                        // Supprimer l'élément du nouveau tableau
                                        newArray.splice(removeIndex, 1);
                                    
                                        // Mettre à jour le state
                                        setPersonList(newArray);
                                    });
                                }} 
                            />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    )
                ))}
              </List>
          </Grid>
        </Scrollbars>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    listItem: {
      backgroundColor: 'none',
      "&:hover": {
          backgroundColor: 'rgba(0,0,0,0.05);',
          cursor: 'pointer'
      },
      padding: 4,
    },
    listItemText: {
        display: 'flex',
        justifyContent: 'flex-start',
        '&:nth-child(1)': {
            width: '10%',
            justifyContent: 'center',
        },
        '&:nth-child(2)': {
            width: '20%'
        },
        '&:nth-child(3)': {
            width: '20%'
        },
        '&:nth-child(4)': {
            width: '30%'
        },
        '&:nth-child(5)': {
            width: '20%',
        }
    },
    button: {
      margin: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        minWidth: 32,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 40,
        cursor: "pointer",
        "& .MuiButton-startIcon": {
          margin: 0
        }
      }
    },
    buttonText: {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      },
      display: "flex",
      marginRight: 5
    },
    List: {
        padding: 0,
    },
    Input: {
        '&:nth-child(5)': {
            width: '70%'
        }
    }
}));