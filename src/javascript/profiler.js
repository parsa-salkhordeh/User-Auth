window.addEventListener('load' , function(){
    // یوزری که لاگین کردرو با getItem میگیریم
    // یک رشته جیسونه پس از Jsonpars
   let user = JSON.parse(localStorage.getItem('user'));

   //routing protection
   if(!user){
     return window.location.href=`/src/login.html`
   }

   let firstname =document.getElementById("firstName");
   let gender = document.getElementById("gender");

   firstname.textContent=`نام: ${user.firstName}`;
   gender.textContent=`جنسیت: ${user.gender}`;
   
});

// خروج از حساب کاربری
const deletButton=document.getElementById("deletBtn");

deletButton.addEventListener('click' , function(){
  localStorage.removeItem('user');
  window.location.href='/src/login.html';

});

// برای بالا آوردن فرم تغییر پسورد
const changePassword= document.getElementById("changePassword");

const changePasswordSection=document.querySelector(".changePasswordSection");
changePassword.addEventListener('click' , function(){
  changePasswordSection.style.display = "block";
});
//برای برگشت از فرم تغییر پسورد
const deletPagePassword=document.getElementById("deletPagePassword");

deletPagePassword.addEventListener('click' , function(){
  changePasswordSection.style.display = "none";
});


// تغییر پسورد
const changePasswordForm=document.getElementById("changePasswordForm");

changePasswordForm.addEventListener('submit' , async function(e){
  e.preventDefault();
  
  // گرفتن یوزرمون از لوکال استوریج
  const user = JSON.parse(localStorage.getItem('user'));

  // گرفتن مقادیر رمز عبور
  const currentPassword = document.getElementById('currentPassword').value
  const newPassword = document.getElementById('newPassword').value
  const confirmPassword = document.getElementById('confirmPassword').value

  // برای درست وارد کردن رمز فعلی
if(currentPassword !== user.password) {
  return Toastify({
    text: "رمز فعلی اشتباه است!",
    duration: 3000,
    gravity: "top",
    position: "center"
}).showToast();
}

if(newPassword !== confirmPassword){
   return Toastify({
    text: "رمزهای جدید یکسان نیستند!",
    duration: 3000,
    gravity: "top",
    position: "center"
}).showToast();
}

try{
  user.password = newPassword
  const res = await fetch(`http://localhost:3000/users/${user.id}` , {
    method:'PUT',
    body: JSON.stringify(user),
    headers:{'content-type':'application/json'}
  })

  if(res.ok){
    console.log("درخواست موفق بود");
    Toastify({
        text: "رمز با موفقیت عوض شد",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "green"
        }
    }).showToast();
  changePasswordSection.style.display = "none";
  localStorage.setItem('user', JSON.stringify(user));
  }
   
}catch(error){
 console.log(error);
}
});