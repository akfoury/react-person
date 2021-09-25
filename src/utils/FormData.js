// Convertir les données du formulaire sous la forme d'un objet js
export const convertFormDataToObject = (e) => {
    const form = e.currentTarget;
    const url = form.action;
    const formData = new FormData(form);

    return {
        formData,
        url
    }
}