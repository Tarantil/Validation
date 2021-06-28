/**
*  Made by Ilona Taran
*
*  Type of valid: name, mail, phone, message, other
*  Example:
*  var arr = new Map([
*    [$("#name"), 'name'],
*    [$("#email"), 'mail'],
*    [$("#phone"), 'phone'],
*    [$("#country"),'other'],
*    [$("#message"), 'message'],
*  ]);
*
*  validateWhenBlur(arr);
*  if(validateWhenSend(arr))
*
**/
class Valid{
   checkField(item, conditionName, sending){
    var message='This input is invalid';
    let rv_name=/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;
    let rv_email = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,})*[0-9A-Za-z]{1})@([0-9A-Za-z]{1}[-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,4})$/u;
    let rv_data = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    let rv_number = /^\d{1,}$/;
    //phone=^\+?(?!(?:.*-){3})(?!.*--)(?=[^()]*\([^()]+\)[^()]*$|[^()]*$)(?!.*-.*[()])(?:[()-]*\d){10}[()-]*$
    let rv_url =/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi;
    var condition;
    switch (conditionName) {
      case 'name':
        condition=item.value.length>=2  && rv_name.test(item.value) && item.value.length<=25;
        if(item.value.length<2){
          message='Not less than 2 symbols please';
        }
        else if(item.value.length>=25 && rv_name.test(item.value)){
          message='No more than 25 symbols please';
        }
        break;
      case 'mail':
        condition=item.value != '' && rv_email.test(item.value) && item.value.indexOf('@')<=64 && item.value.lastIndexOf('.')-item.value.indexOf('@')<=188;
        break;
      case 'phone':
        condition=item.value != '' && rv_number.test(item.value) && item.value.length>=7 && item.value.length<=15;
        if(item.value.length<=7){
          message='Not less than 10 symbols please';
        }
        else if(item.value.length>=15){
          message='No more than 15 symbols please';
        }
        break;
        case 'url':
        condition=item.value != '' && rv_url.test(item.value);
        break;
      case 'message':
        condition=item.value != '' && item.value.length>=2 && item.value.length<=180;
        if(item.value.length<2){
          message='Not less than 2 symbols please';
        }
        else if(item.value.length>=180){
          message='No more than 180 symbols please';
        }
        break;
      default:
        condition=item.value != '';
        break;
    }
    var parent_item=item.closest(".container-limit");
    if(condition){
      if(sending){
        parent_item.classList.remove('container-limit_correct');
      }
      else{
        parent_item.classList.add('container-limit_correct');
      }
      if(parent_item.querySelector('.limit-text')){
        parent_item.querySelector('.limit-text').textContent='';
      }

      parent_item.classList.remove('container-limit_incorrect');
      return true;
    }
    else{
      if(parent_item.querySelector('.limit-text')){
        parent_item.querySelector('.limit-text').textContent=message;
      }
      parent_item.classList.remove('container-limit_correct');
      parent_item.classList.add('container-limit_incorrect');
      return false;
    }
  }
   validateWhenBlur(arr){
    arr.forEach((value,key)=>{
      key.addEventListener("blur", () => {
        this.checkField(key, value, false);
      });
    });
  }
   validateWhenSend(arr){
    var boll=true;
    arr.forEach((value,key)=>{
        boll&=this.checkField(key, value, true);
    });
    return boll;
  }

}
