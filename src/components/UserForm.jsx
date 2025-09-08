
import LabeledInput from "./LabeledInput";
import CustomButton from "./Button";

const UserForm = ({ formData, handleChange, onSave, onClear, getError }) => {

    const nameErrorMsg = getError("name");
    const phoneErrorMsg = getError("phone");
    const emailErrorMsg = getError("email");

    return (
        <>
            <LabeledInput
                error={!!nameErrorMsg}
                helperText={nameErrorMsg}
                onChange={handleChange}
                value={formData.name}
                name="name"
                label="Nome"
            />
            <LabeledInput
                error={!!phoneErrorMsg}
                helperText={phoneErrorMsg}
                onChange={handleChange}
                value={formData.phone}
                name="phone"
                label="Telefone"
            />
            <LabeledInput
                error={!!emailErrorMsg}
                helperText={emailErrorMsg}
                onChange={handleChange}
                value={formData.email}
                name="email"
                label="E-mail"
            />
            <CustomButton label="Salvar" onClick={onSave} />
            <CustomButton color="secondary" label="Limpar" onClick={onClear} />
        </>
    );
};

export default UserForm;