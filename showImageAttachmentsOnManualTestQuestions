// ==UserScript==
// @name     show image attachments on manual test questions
// @version  1
// @grant    none
// @include  http*://*moodle*/mod/quiz/report.php*mode=grading*grade=needsgrading*
// ==/UserScript==

//document.querySelectorAll(".attachments a[href*=jpg], .attachments a[href*=png], .attachments a[href*=gif], .attachments a[href*=bmp]").forEach((e,i,a)=>{
document.querySelectorAll(".attachments a[href]").forEach((e,i,a)=>{
  if(e.querySelector("img.icon[alt*='Изображение']")){
    var img = document.createElement("img");
    img.src = e.href;
    img.style.maxWidth = "750px";
    img.style.display = "block";
    e.parentElement.insertBefore(img, e);
  }
});

/*document.addEventListener("DOMContentLoaded", ev=>{
	document.querySelectorAll(".attachments a[href*=jpg], .attachments a[href*=png], .attachments a[href*=gif], .attachments a[href*=bmp]").forEach((e,i,a)=>{
  	var img = document.createElement("img");
    img.src = e.href;
    e.parentElement.insertBefore(img, e);
  });
});*/

/*$(()=>{
  $(".attachments")
    .find("a[href*=jpg], a[href*=png], a[href*=gif], a[href*=bmp]")
    .each((i,e)=>{
      $(e).after(
        $("<img>")
          .attr("src", $(e).attr("href"))
      );
    });
});*/
