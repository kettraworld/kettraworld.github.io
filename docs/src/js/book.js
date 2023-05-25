var pages = document.querySelectorAll(".page");
var currentPage = 0; 
var Previous = document.getElementById("previous"); 
var Next = document.getElementById("next");

 function showPage(page) {

  pages[currentPage].style.display = "none";
  pages[page].style.display = "block";
  currentPage = page;

  if (currentPage === 0) {
    Previous.style.display = "none";
  } else {
    Previous.style.display = "block";
  }

  if (currentPage === pages.length - 1) {
    Next.style.display = "none";
  } else {
    Next.style.display = "block";
  }
 }

  Previous.style.display = "none";
  Next.addEventListener("click", () => {
    showPage(currentPage + 1);
  });

  Previous.addEventListener("click", () => {
    showPage(currentPage - 1);
  });    
  