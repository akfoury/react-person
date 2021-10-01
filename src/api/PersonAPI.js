// Récupérer toutes les personnes de la base de données
const getAllPerson = async (pageNum, numRows) => {
    const myInit = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    };

    return fetch(`/person/${pageNum}/${numRows}`, myInit)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw response;
        });
}


// Ajouter une personne à la base de données
const postFormDataAsJson = async ({ formData, url }) => {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

// Mettre à jour une personne
const putFormDataAsJson = async ({ formData, url }) => {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);


    if (!response.ok) {
        const errorMessage = response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}


// Supprimer une personne de la liste
const deletePerson = async (personID) => {
    const myInit = {
        method: 'DELETE'
    };
    console.log(personID);
    const response = await fetch(`person/${personID}`, myInit);

    return response;
};

// Supprimer toutes les personnes de la liste
const deleteAllPerson = async () => {
    const myInit = {
        method: 'DELETE'
    };
    const response = await fetch('person/', myInit);

    return response;
}

export { getAllPerson, postFormDataAsJson, putFormDataAsJson, deletePerson, deleteAllPerson }