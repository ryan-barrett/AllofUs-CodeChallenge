$(document).ready(function() {
  //EVENT HANDLERS
  let firstClick = true;

  //handling first click of demo map
  $("main")
    .find(".old-world-map")
    .on("click", function() {
      if (firstClick === true) {
        firstClick = false;
        window.scroll(2396, 150);
        $("main")
          .find(".doc")
          .fadeOut(1500, function() {
            $(this).addClass("hidden");
          });
        $(this)
          .find(".doc-title")
          .html("<h3>Dutch Map of the Middle East 1868</h3>");
        $(this)
          .find(".details-view")
          .html("<h4>(Click to Exit)</h4>");
        $(this)
          .parent()
          .find(".map-details")
          .fadeIn(1500, function() {
            $(this).removeClass("hidden");
          });
        $(this).addClass("fixed-map");
        $(".trade-text").html("");
        //define scroll position
        var scrollPosition = [
          self.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft,
          self.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop
        ];
        var html = $("html"); //Lock scroll position
        html.data("scroll-position", scrollPosition);
        html.data("previous-overflow", html.css("overflow"));
        html.css("overflow", "hidden");
        window.scrollTo(scrollPosition[0], scrollPosition[1]);
      } else {
        //handling second click of demo map
        firstClick = true;
        $("main")
          .find(".doc")
          .fadeIn(1200, function() {
            $(this).removeClass("hidden");
          });
        $(this)
          .find(".doc-title")
          .html("<h4>Document 5</h4>");
        $(this)
          .find(".details-view")
          .html("<h5>(Click for Demo)</h5>");
        $(this)
          .parent()
          .find(".map-details")
          .fadeOut(1200, function() {
            $(this).addClass("hidden");
          });
        $(this).removeClass("fixed-map");
        $(".trade-text").html("Trade and Global Connections");
        // un-lock scroll position
        var html = jQuery("html");
        var scrollPosition = html.data("scroll-position");
        html.css("overflow", html.data("previous-overflow"));
        window.scrollTo(scrollPosition[0], scrollPosition[1]);
      }
    });

  //SCROLLMAGIC BEHAVIOR
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      duration: $("section").height(),
      triggerHook: 0.025,
      reverse: true
    },
    vertical: false
  });

  var scenes = {
    intro: {
      intro: "intro-anchor"
    },
    scene2: {
      "section-1": "anchor1"
    },
    scene3: {
      "section-2": "anchor2"
    }
  };

  for (var key in scenes) {
    // skip loop if the property is from prototype
    if (!scenes.hasOwnProperty(key)) continue;

    var obj = scenes[key];

    for (var prop in obj) {
      // skip loop if the property is from prototype
      if (!obj.hasOwnProperty(prop)) continue;

      new ScrollMagic.Scene({ triggerElement: "#" + prop })
        .setClassToggle("#" + obj[prop], "active")
        .addTo(controller);
    }
  }

  /* Change behaviour of controller
  to animate scroll instead of jump */
  controller.scrollTo(function(target) {
    TweenMax.to(window, 0.5, {
      scrollTo: {
        x: target,
        autoKill: true // Allow scroll position to change outside itself
      },
      ease: Cubic.easeInOut
    });
  });

  //  Bind scroll to anchor links
  var anchor_nav = document.querySelector(".anchor-nav");

  anchor_nav.addEventListener("click", function(e) {
    var target = e.target,
      id = target.getAttribute("href");

    if (id !== null && id.length > 0) {
      e.preventDefault();
      controller.scrollTo(id);

      if (window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  });
});
