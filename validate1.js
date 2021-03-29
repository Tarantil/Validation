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
  function validate(item, conditionName, sending){
    var message='This input is invalid';
    let rv_name=/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:.,[\]]{2,}$/u;
    let rv_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
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
        condition=item.value != '' && rv_number.test(item.value) && item.value.length>=10 && item.value.length<=15;
        if(item.value.length<=10){
          message='Not less than 10 symbols please';
        }
        else if(item.value.length>=15){
          message='No more than 15 symbols please';
        }
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
    parent_item=item.closest(".container_limit");
    if(condition){
      if(sending){
        parent_item.classList.remove('container_limit_correct');
      }
      else{
        parent_item.classList.add('container_limit_correct');
      }
      parent_item.querySelector('.limit_text').text('');
      parent_item.classList.remove('container_limit_incorrect');
      return true;  
    }
    else{
      parent_item.querySelector('.limit_text').text(message);
      parent_item.classList.remove('container_limit_correct');
      parent_item.classList.add('container_limit_incorrect');
      return false;
    }
  }
  function validateWhenBlur(arr){
    arr.forEach(function(value,key) {
      key.blur(function() {
        validate(key, value, false);
      });
    });
  }
  function validateWhenSend(arr){
    var boll=true;
    arr.forEach(function(value,key) {
        boll&=validate(key, value, true);
    });
    return boll;
  }
}