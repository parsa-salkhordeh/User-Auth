const loginForm=document.getElementById("loginForm");

loginForm.addEventListener('submit' , async (e)=>{
    //برای جلوگیری از رفرش صفحه
    e.preventDefault();

    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    try {
        const res= await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
        const users=await res.json()

        if(users.length > 0){

            const user = users[0];
            // یک شرط دیگه ساختم برای اینکه مقایسه کنه پسورد وارد شده با پسورد دیتابیس
            if(user.password == password){
                Toastify({ text: "موفق" }).showToast();
                window.location.href="profiler.html"
            }else{
                 Toastify({ text: "ایمیل یا پسورد صحیح نیست!" }).showToast();
            }

        }
        else{ 
            Toastify({ text: "ایمیل یا رمز نامعتبر میباشند"}).showToast();
         }

    } catch (error) {
        console.log(error);
    }

});