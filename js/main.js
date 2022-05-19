/* ------------------ Variables ----------------- */

let nameInput = document.querySelector("#name");
let nameError = document.querySelector("#name-error");
let emailInput = document.querySelector("#email");
let emailError = document.querySelector("#email-error");
let phoneInput = document.querySelector("#phone");
let phoneError = document.querySelector("#phone-error");
let ageInput = document.querySelector("#age");
let ageError = document.querySelector("#age-error");
let passwordInput = document.querySelector("#password");
let passwordError = document.querySelector("#password-error");
let repasswordInput = document.querySelector("#repassword");
let repasswordError = document.querySelector("#repassword-error");
let movies = [];

/* ------------------ Api's ----------------- */

async function getApi(type = "popular") {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${type}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`
  );
  let finalResult = await response.json();
  movies = finalResult.results;
  displayMovies();
}
async function getTrending() {
  let response = await fetch(
    "https://api.themoviedb.org/3/trending/all/week?api_key=1678a819276e7e59cbbc5082405f88bb"
  );
  let finalResult = await response.json();
  movies = finalResult.results;
  displayMovies();
}
getApi();

function displayMovies() {
  let moviesContainer = ``;
  for (let i = 0; i < movies.length; i++) {
    {
      moviesContainer += `<div class="col-md-4 pt-3">
              <div class="image-container">
                <img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" alt="" class="w-100" />
                <div
                  class="
                    image-hover
                    text-center
                    d-flex
                    flex-column
                    justify-content-center
                  "
                >
                  <h2 class="f">${movies[i].title}</h2>
                  <p>
                  ${movies[i].overview}
                  </p>
                  <p>Imdb rating : ${movies[i].vote_average}</p>
                  <p>Release date : ${movies[i].release_date}</p>
                </div>
              </div>
            </div>
      `;
    }
    document.getElementById("moviesData").innerHTML = moviesContainer;
  }
}

/* ------------------ Regex ----------------- */

$("#name").keypress(() => {
  let nameRegex = /^[a-zA-Z]+$/i;
  if (nameRegex.test(nameInput.value)) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
});

$("#email").keypress(() => {
  let emailRegex = /\S+@\S+\.\S+/;
  if (emailRegex.test(emailInput.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
});
$("#phone").keypress(() => {
  let phoneRegex = /^01[0125][0-9]{7}$/g;
  if (phoneRegex.test(phoneInput.value)) {
    phoneError.style.display = "none";
  } else {
    phoneError.style.display = "block";
  }
});
$("#age").keypress(() => {
  let ageRegex = /[1-9][1-9]?/;
  if (ageRegex.test(ageInput.value)) {
    ageError.style.display = "none";
  } else {
    ageError.style.display = "block";
  }
});

$("#password").keypress(() => {
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (passwordRegex.test(passwordInput.value)) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }
});
$("#repassword").keypress(() => {
  if (passwordInput.value === repasswordInput.value) {
    repasswordError.style.display = "none";
  } else {
    repasswordError.style.display = "block";
  }
});

/* ------------------ Side nav animation ----------------- */

$("#hamburger-icon").click(() => {
  $("#hidden-nav").animate({ left: "0px" }, 500);
  $("aside").animate({ right: "0", left: "100%" }, 500);
  $("#close-icon").css({ display: "block" }, 500);
  $("#hamburger-icon").css({ display: "none" }, 500);
  $(".nav-links ul li")
    .eq(0)
    .animate({ top: 0, opacity: 1 }, 900, () => {
      $(".nav-links ul li")
        .eq(1)
        .animate({ top: 0, opacity: 1 }, 200, () => {
          $(".nav-links ul li")
            .eq(2)
            .animate({ top: 0, opacity: 1 }, 200, () => {
              $(".nav-links ul li")
                .eq(3)
                .animate({ top: 0, opacity: 1 }, 200, () => {
                  $(".nav-links ul li")
                    .eq(4)
                    .animate({ top: 0, opacity: 1 }, 200, () => {
                      $(".nav-links ul li")
                        .eq(5)
                        .animate({ top: 0, opacity: 1 }, 200, () => {});
                    });
                });
            });
        });
    });
});

$("#close-icon").click(() => {
  $("#hidden-nav").animate({ left: "-100%" }, 500);
  $("aside").animate({ left: "0", right: "100%" }, 500);
  $("#close-icon").css({ display: "none" }, 500);
  $("#hamburger-icon").css({ display: "block" }, 500);
  $(".nav-links ul li").eq(5).animate({ top: "200", opacity: 0 }, 200);
  $(".nav-links ul li").eq(4).animate({ top: "200", opacity: 0 }, 200);
  $(".nav-links ul li").eq(3).animate({ top: "200", opacity: 0 }, 200);
  $(".nav-links ul li").eq(2).animate({ top: "200", opacity: 0 }, 200);
  $(".nav-links ul li").eq(1).animate({ top: "200", opacity: 0 }, 200);
  $(".nav-links ul li").eq(0).animate({ top: "200", opacity: 0 }, 200);
});

/* ------------------ Side nav Links ----------------- */

$("#nowPlaying").click(() => {
  getApi("now_playing");
});

$("#popular").click(() => {
  getApi("popular");
});

$("#topRated").click(() => {
  getApi("top_rated");
});

$("#trending").click(() => {
  getTrending();
});

$("#upcoming").click(() => {
  getApi("upcoming");
});

/* ------------------ search bars ----------------- */

let searchDatabase = document.querySelector("#search-database");
let searchCurrentList = document.querySelector("#current-list");

async function searchAllMovies(search) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=1678a819276e7e59cbbc5082405f88bb&language=en-US&query=${search}&page=1&include_adult=false`
  );
  let finalResult = await response.json();
  movies = finalResult.results;
  displayMovies();
}
$("#search-database").keyup(() => {
  searchAllMovies(searchDatabase.value);
});

/* ------------------ search current ----------------- */

function searchCurrent(movieTitle) {
  let moviesContainer = ``;
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].title.includes(movieTitle) == true) {
      moviesContainer += `<div class="col-md-4 pt-3">
              <div class="image-container">
                <img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" alt="" class="w-100" />
                <div
                  class="
                    image-hover
                    text-center
                    d-flex
                    flex-column
                    justify-content-center
                  "
                >
                  <h2 class="f">${movies[i].title}</h2>
                  <p>
                  ${movies[i].overview}
                  </p>
                  <p>${movies[i].vote_average}</p>
                  <p>${movies[i].release_date}</p>
                </div>
              </div>
            </div>
      `;
    }
    document.getElementById("moviesData").innerHTML = moviesContainer;
  }
}

$("#current-list").keyup(() => {
  searchCurrent(searchCurrentList.value);
});
