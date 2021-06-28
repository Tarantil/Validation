# Validation

#  Type of valid: name, mail, phone, message, other
  Example in javascript file:
  ---------------------------
  
    var arr = new Map([

      [$("#name"), 'name'],

      [$("#email"), 'mail'],

      [$("#phone"), 'phone'],

      [$("#country"),'other'],

      [$("#message"), 'message'],

    ]);  

    validateWhenBlur(arr);

    if(validateWhenSend(arr))
  
  Structure in html:
  ------------------
    <div class='container_limit'>
      <input type="text" name="email" id="email" placeholder="Type here..." class="form-control">
      <div class="limit_text"></div>
    </div>
