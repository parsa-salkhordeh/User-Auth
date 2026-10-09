const loginForm=document.getElementById("loginForm");

loginForm.addEventListener('submit' , async (e)=>{
    //برای جلوگیری از رفرش صفحه
    e.preventDefault();

    const email=document.getElementById('email').value;
    const firstname=document.getElementById('firstname').value;
    const password=document.getElementById('password').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.id;

    try {
        const res= await fetch(`http://localhost:3000/users?email=${email}&firstname=${firstname}&password=${password}&gender=${gender}`);
        const users=await res.json()

        if(users.length > 0){

            const user = users[0];
            // یک شرط دیگه ساختم برای اینکه مقایسه کنه پسورد وارد شده با پسورد دیتابیس
            if(user.password == password){
                Toastify({ text: "موفق" }).showToast();
            }else{
                 Toastify({ text: "ایمیل یا پسورد صحیح نیست!" }).showToast();
            }

        }
        else{ 
            Toastify({ text: "چنین ایمیلی پیدا نشد"}).showToast();
         }

    } catch (error) {
        console.log(error);
    }

});