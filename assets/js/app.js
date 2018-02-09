$(document).ready(function() {
  console.log("sanity check");

  //EVENT HANDLERS
  let firstClick = true;

  $("main")
    .find(".old-world-map")
    .on("click", function() {
      if (firstClick === true) {
        firstClick = false;
        $("main")
          .find(".doc")
          .fadeOut(1200, function() {
            $(this).addClass("hidden");
          });
        $(this)
          .find(".doc-title")
          .html("<h3>Dutch Map of the Middle East 1868</h3>");
        $(this)
          .find(".details-view")
          .html("<h5>(Click to Exit)</h5>");
        $(this)
          .parent()
          .find(".map-details")
          .fadeIn(1200, function() {
            $(this).removeClass("hidden");
          });
        $(this).addClass("fixed-map");
        $(".trade-text").html("");
      } else {
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
      }
    });

  //BEGIN SCROLLMAGIC BEHAVIOR
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

  // Change behaviour of controller
  // to animate scroll instead of jump
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
  //END SCROLLMAGIC BEHAVIOR
});
