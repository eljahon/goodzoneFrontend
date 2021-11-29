

export const  numberChange = (number) => {
    let newNumbers = []
    let numb = number?.split('')
   numb?.forEach((el, index) => {
        if(index === 4){
          newNumbers.push(' (')
        }
        if(index === 6){
          newNumbers.push(') ')
        }
        if(index === 6 || index === 7 || index === 8){
         return newNumbers.push('*')
        }
        if(index === 9){
            newNumbers.push(' ')
          }
          if(index === 9   || index === 10){
            return newNumbers.push('*')
           }
           if(index === 11){
            newNumbers.push(' ')
          }
        return newNumbers.push(el)
    }    )
    
    return newNumbers.join('')
}
