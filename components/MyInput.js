  import React from "react"
  import InputMask from "react-input-mask"
import { withTranslation } from "../i18n";




 const CardInput = (props) => {
     return(
        <InputMask mask="9999 9999 9999 9999" value={props.value}
         onChange={props.onChange}>
                    
          {(inputProps) => <input {...inputProps} type="text"
          placeholder="0000 0000 0000 0000"
          required  />}
    
        </InputMask>
      )
 };
   


  // Will throw an error because InputMask's and children's onChange aren't the same
  const InvalidCardInput = (props) => (
    <InputMask mask="9999 9999 9999 9999" value={props.value}>
      {(inputProps) => <input {...inputProps} type="tel" disableUnderline onChange={props.onChange} />}
    </InputMask>
  );

  const PhoneInput = (props) =>{
    const {t} = withTranslation()

      return (
            <InputMask mask="+999 99 999 99 99" required value={props.value} onChange={props.onChange}>
          { (inputProps) => <input {...inputProps} type="tel"
                    placeholder={t("phone-number")}
                    />}
      
      </InputMask>
  )}
  export {
    CardInput,
    PhoneInput,
    InvalidCardInput
  }






//   const SHohabbos = (props) =>(
//     <InputMask 
//     value={props.value}
//     onChange={props.onChange} 
//     mask={"99/99/9999"} 
//     id="cardNumber"
//     name="card_number"
//     inputMode = "numeric"
//     autoComplete = "cc-number"
//     onChange={(e) => {
//       // const {value} = e.target
//       // event.target.value = normalizeCardNumber(value)
//       setGetUserData({
//         ...getUserData,
//         number: e.target.value,
//       })}}
//       >
//         { (inputProps) => <input {...inputProps} tel="tel" />}
//     </InputMask>
//   )

//   const InvalidSHohabbos = (props) => (
//     <InputMask mask="99/99/9999" value={props.value}>
//       {(inputProps) => <input {...inputProps} type="tel"  onChange={props.onChange} />}
//     </InputMask>
//   );