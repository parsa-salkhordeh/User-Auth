window.addEventListener('load' , function(){
    // یوزری که لاگین کردرو با getItem میگیریم
    // یک رشته جیسونه پس از Jsonpars
   let user = JSON.parse(localStorage.getItem('user'));

   let firstname =document.getElementById("firstName");
   let gender = document.getElementById("gender");

   firstname.textContent=`نام: ${user.firstName}`
   gender.textContent=`جنسیت: ${user.gender}`
   
});