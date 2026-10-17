const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  //برای جلوگیری از رفرش صفحه
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(
      `http://localhost:3000/users?email=${email}&password=${password}`
    );
    const users = await res.json();

    if (users.length > 0) {
      const user = users[0];

      // یک شرط دیگه ساختم برای اینکه مقایسه کنه پسورد وارد شده با پسورد دیتابیس
      if (user.password == password) {
        Toastify({
          text: "موفق",
          duration: 3000,
          gravity: "top",
          position: "center",
        }).showToast();
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "profiler.html";
        
      } else {
        Toastify({
          text: "ایمیل یا پسورد صحیح نیست!",
          duration: 3000,
          gravity: "top",
          position: "center",
        }).showToast();
      }
    } else {
      Toastify({
        text: "ایمیل یا رمز نامعتبر میباشند",
        duration: 3000,
        gravity: "top",
        position: "center",
      }).showToast();
    }
  } catch (error) {
    console.log(error);
  }
});

// برسی لاگین بودن کاربر
window.addEventListener('load' , function(){
  let user= localStorage.getItem('user');
  if(user){
    window.location.href="/profiler.html"
  }
});