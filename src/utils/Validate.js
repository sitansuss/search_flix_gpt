export const checkValidData = (email,password) => {
//const isFullNameValid = /^[a-zA-Z-' ]+$/.test(fullname)
const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
//if(!isFullNameValid) return "please enter your full name"
if(!isEmailValid) return "Email is not valid "; 
if(!isPasswordValid) return "password is not valid "; 

return null;
};