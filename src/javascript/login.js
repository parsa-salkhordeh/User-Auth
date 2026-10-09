const loginForm=document.getElementById("loginForm");

loginForm.addEventListener('submit' , async (e)=>{
    //برای جلوگیری از رفرش صفحه
    e.preventDefault();

    const email=document.getElementById('email').value
    const firstname=document.getElementById('firstname').value
    const password=document.getElementById('password').value
    const gender = document.querySelector('input[name="gender"]:checked')?.id;

    try {
        const res= await fetch(`http://localhost:3000/users?email=${email}&firstname=${firstname}&password=${password}&gender=${gender}`)
        const user=await res.json()
    } catch (error) {
        console.log(error)
    }

});