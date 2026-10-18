const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  const user = { firstName, email, password, gender };

  // شرط گذاشتیم که پسورد کمتر از 6 نباشه و با حروف شروع شود

  const passwordRegex = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*]{5,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "رمز عبور باید حداقل ۶ کاراکتر داشته باشد و با یک حرف انگلیسی شروع شود.",
    );
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "profiler.html";
    }
  } catch (error) {alert("مشکلی پیش آمده")}
});

// برسی لاگین بودن کاربر

window.addEventListener("load", function () {
  let user = localStorage.getItem("user");
  if (user) {
    window.location.href = "/profiler.html";
  }
});
