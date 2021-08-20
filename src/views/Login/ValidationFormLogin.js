import * as Yup from 'yup';


const validationFormLogin= Yup.object().shape({
    // Regex Code postal 
        email : Yup.
        string()
        // Le champ est requis
        .required('L\'email est obligatoire.'),

        password : Yup
        .string()
        // champ requie 
        .required('Le mot de passe est obligatoire.')
});

export default validationFormLogin;