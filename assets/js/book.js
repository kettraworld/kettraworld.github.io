$(document).ready(() => {
   
  var pages = $(".page");
  var currentPage = 0; 
  var Previous = $("#previous"); 
  var Next = $("#next");

  function showPage(page) {
    pages.eq(currentPage).hide();
    pages.eq(page).show();
    currentPage = page;

    if (currentPage === 0) {
      Previous.hide();
    } else {
      Previous.show();
    }

    if (currentPage === pages.length - 1) {
      Next.hide();
    } else {
      Next.show();
    }
  }

  Previous.hide();
  Next.on("click", () => {
    showPage(currentPage + 1);
  });

  Previous.on("click", () => {
    showPage(currentPage - 1);
  });
});