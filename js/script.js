jQuery(document).ready(function($) {

// Cover section gallery
$("#background-gallery").lightSlider({
  auto: true,
  mode: "fade",
  useCSS: true,
  speed: 2500,
  pause: 6000,
  loop: true,
  controls: false,
  pager: false,
  enableDrag: false
});

// Scroll animations
var controller = new ScrollMagic.Controller();
      
// Enter section animations
$(".content-section").each(function(){
  // Section enter
  var currentSection = this;
  var enterSection = new ScrollMagic.Scene({
    duration: 0,
    triggerElement: currentSection,
    reverse: false,
    triggerHook: 0.5
  })
  .setClassToggle(currentSection, "active-section")
  .addTo(controller);
});

// Menu section animations
$(".menu-section").each(function(){
  // Menu change based on section visible in viewport
  var currentSection = this;
  var currentSectionId = $(this).attr("id");
  var currentHeight = $(this).outerHeight();
  var changeMenu = new ScrollMagic.Scene({
    duration: currentHeight,
    triggerElement: currentSection,
    reverse: true
  })
  .on("enter", function (){ menuStateUpdate(currentSectionId) })
  .on("leave", function (){ menuStateLeave(currentSectionId) })
  .addTo(controller);
});

var menuStateUpdate = function(stateUpdate) {
  $(".main-navigation").find("a.active-section-link").removeClass("active-section-link");
  $(".main-navigation").find("a[href='#"+stateUpdate+"']").addClass("active-section-link");
}
var menuStateLeave = function(stateUpdate) {
  $(".main-navigation").find("a[href='#"+stateUpdate+"']").removeClass("active-section-link");
}


// Open/close menu
$(document).on("click", ".hamburger-button", function(e){
  e.preventDefault();
  if($("body.menu-opened").length>0){
    hideMenu();
  }
  else{
    showMenu(); 
  }
});

$(document).on("click", ".goback-menu", function(e){
  e.preventDefault();
  hideMenu();
  $(".thank-you-window.show").removeClass("show");
  randomise($(".thank-you-people"), ", ");
  randomise($(".thank-you-firms"), " / ");
});

var showMenu = function(){
  $(".navigation-layer").addClass("display");
  setTimeout(function(){
    $(".navigation-layer").addClass("show");
     $(".hamburger-button .line").addClass("animate-1");
  },10);
  setTimeout(function(){
    $(".hamburger-button .line").addClass("animate-2");
  },250);
  $("body").addClass("menu-opened");
}

var hideMenu = function(){
  $(".navigation-layer").removeClass("show");
  $(".hamburger-button .line").removeClass("animate-2");
  $(".hamburger-button .line").removeClass("animate-1");
  setTimeout(function(){

    $(".navigation-layer").removeClass("display");
  },250);

  $("body").removeClass("menu-opened");
}


  // Light gallery 

  $(".photos-gallery").lightGallery({
    zoom: false,
  });


  // kontakt button click

  $(document).on("click", ".nav-buttons .text-button, a.read-more-link", function(e){
    e.preventDefault();
    var thisHref = $(e.target).attr("href");
    var thisSectionPosition = $(thisHref).offset().top;
    console.log(thisSectionPosition);
    if($(".navigation-layer.show").length>0){
      hideMenu();
      setTimeout(function(){
         $("body, html").animate({scrollTop: thisSectionPosition}, 1000);
      }, 250);
    }
    else {
      $("body, html").animate({scrollTop: thisSectionPosition}, 1000);
    }

  });

  // bottom heart click
  $(document).on("click", ".bottom-heart", function(e){
    e.preventDefault();
    var thisHref = "#section-intro";
    var thisSectionPosition = $(thisHref).offset().top;
    console.log(thisSectionPosition);
    $("body, html").animate({scrollTop: thisSectionPosition}, 1000);
  });

  // Fullpage
  $('.sections-container').fullpage({

      anchors: ['cover',
       'intro',
       'community-voices',
       'civic-tech',
       'events',
       'event-1',
       'event-2',
       'event-3',
       'event-4',
       'build',
       'assets-declarations',
       'konsultimi-publik',
       'moonship',
       'ted2',
       'public-procurement',
       'social-media-scraper',
       'research',
       'workshops',
       'workshops-overview',
       'working-groups',
       'whats-next',
       'bye'],
      onLeave: function(index, nextIndex, direction){
        enterSection(index, nextIndex, direction);
      },
      afterLoad: function(){
        $(".sections-container").addClass("loaded");
      },
      responsiveWidth: 780
  });
 
  var enterSection = function(index, nextIndex, direction){
    var trueNextIndex = nextIndex - 1;
    var nextSection = $('.sections-container').find(".section:eq("+trueNextIndex+")");
    if(!(nextSection.hasClass("active-section"))){
      $(nextSection).addClass("active-section");
    }
    else{
      // console.log("shit");
    }
    if(nextSection.hasClass("dark")){
      $("body").addClass("invert-header") 
    }
    else{
      $("body").removeClass("invert-header") 
    }
  }

    // Menu click scroll functions

  $(document).on("click", ".main-navigation a", function(e){
    e.preventDefault();
    var thisHref = $(e.target).closest("a").attr("data-goto");
    console.log(thisHref);
    hideMenu();
    setTimeout(function(){
       $.fn.fullpage.moveTo(thisHref);
    }, 250);
  });

  $.fn.fullpage.setLockAnchors(true);


  // Events moveto

  $(document).on("click", ".event-link-container, .project-block", function(e){
    e.preventDefault();
    var thisHref = $(e.target).closest("a").attr("data-goto");
    console.log(thisHref);
    $.fn.fullpage.moveTo(thisHref);
  });


  // Lightslider

  $(".quotes-container").lightSlider({
    item: 1,
    slideMove: 1
  });

  // lightgallery

  $(".transparent-light-gallery").each(function(){
    $(this).lightGallery({
      zoom: false,
      thumbnail: false
    });
  });

  $(document).on("click", ".popup-open", function(e){
    e.preventDefault();
    var windowOpen = $(e.target).attr("data-window");
    console.log(windowOpen);
    $("." + windowOpen).addClass("show");
  });


function randomise(selector, divider){
  // random people
  var people = new Array();
  var howMuchPeople = selector.find("span").length;
  for (var i = 0; i < howMuchPeople; i++) {
    var thisName = selector.find("span").eq(i).text();
    people[i] = thisName;
  };

  // clear thankyoupeople content
  selector.html("");

  var selectedNames = new Array();

  // get random number 
  var randomName;
  function getRandomName(){
     randomName= Math.floor((Math.random() * howMuchPeople));
  }
  var alreadySelected = false;
  function getNextName(){
    getRandomName();
    // check if random name is already selected

    for(var i = 0; i <= selectedNames.length; i++){
      if(randomName == selectedNames[i]){
        alreadySelected = true;
        getNextName();
        return true;
      }
      else{
        alreadySelected = false;
      }
    }
    if(!alreadySelected){
      publishName();
    }
  }

  getNextName();

  function publishName(){
    selectedNames[selectedNames.length] = randomName;
    // console.log(randomName);
    if(selectedNames.length == (howMuchPeople)){
      selector.append("<span>" + people[randomName] + "</span>");
    }
    else {
      selector.append("<span>" + people[randomName] + "</span>" + divider);
    }
    if(selectedNames.length < howMuchPeople){
      getNextName();
    }
  };

}

randomise($(".thank-you-people"), ", ");
randomise($(".thank-you-firms"), " / ");


});