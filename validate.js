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
   validate($item, $conditionName, $sending){
    var message='This input is invalid';
    let rv_name=/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:.,[\]]{2,}$/u;
    let rv_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    let rv_data = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    let rv_number = /^\d{1,}$/;
    //phone=^\+?(?!(?:.*-){3})(?!.*--)(?=[^()]*\([^()]+\)[^()]*$|[^()]*$)(?!.*-.*[()])(?:[()-]*\d){10}[()-]*$
    let rv_url =/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi;
    var condition;
    switch ($conditionName) {
      case 'name':
        condition=$item.val().length>=2  && rv_name.test($item.val()) && $item.val().length<=25;
        if($item.val().length<2){
          message='Not less than 2 symbols please';
        }
        else if($item.val().length>=25 && rv_name.test($item.val())){
          message='No more than 25 symbols please';
        }
        break;
      case 'mail':
        condition=$item.val() != '' && rv_email.test($item.val()) && $item.val().indexOf('@')<=64 && $item.val().lastIndexOf('.')-$item.val().indexOf('@')<=188;
        break;
      case 'phone':
        condition=$item.val() != ''  && rv_number.test($item.val()) && $item.val().length>=10 && $item.val().length<=15;
        if($item.val().length<=10){
          message='Not less than 10 symbols please';
        }
        else if($item.val().length>=15){
          message='No more than 15 symbols please';
        }
        break;
      case 'message':
        condition=$item.val() != '' && $item.val().length>=2 && $item.val().length<=180;
        if($item.val().length<2){
          message='Not less than 2 symbols please';
        }
        else if($item.val().length>=180){
          message='No more than 180 symbols please';
        }
        break;
      default:
        condition=$item.val() != '';
        break;
    }
    if(condition){
      if($sending){
        $item.closest(".container_limit").removeClass('correct');
      }
      else{
        $item.closest(".container_limit").addClass('correct');
      }
      $item.siblings('.limit_text').text('');
      $item.closest(".container_limit").removeClass('incorrect');
      return true;  
    }
    else{
      $item.siblings('.limit_text').text(message);
      $item.closest(".container_limit").removeClass('correct');
      $item.closest(".container_limit").addClass('incorrect');
      return false;
    }
  }
  validateWhenBlur($arr){
    $arr.forEach((value,key)=>{
      key.blur(() => {
        this.validate(key, value, false);
      });
    });
  }
  validateWhenSend($arr){
    var boll=true;
    $arr.forEach((value,key)=>{
        boll&=this.validate(key, value, true);
    });
    return boll;
  }
}