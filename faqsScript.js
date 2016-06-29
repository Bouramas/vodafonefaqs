// Make the actual CORS request.
function makeCorsRequest(lang) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          readFaqsFromXML(xhttp);
      }
    };
    xhttp.open("GET", "mobileFAQsExample.xml", true);
    xhttp.send();

    function readFaqsFromXML(xml) {
        var x, questionText, answerText, hasToggleBtn, xmlDoc;
        xmlDoc = xml.responseXML;

        mobileFAQs = xmlDoc.getElementsByTagName('MobileFAQ');
        
        var questionTag, answerTag;
        if (lang === "en") {
            questionTag = "questionEnglish";
            answerTag = "answerEnglish";
        } else {
            questionTag = "questionGreek";
            answerTag = "answerGreek";
        }


        // This is where the faqs will be added
        var questionsContainer = document.getElementById("faqContainer").innerHTML;

        for (var i = 0; i < mobileFAQs.length; i++) { 
            // Find and store the question tag content
            x = xmlDoc.getElementsByTagName(questionTag)[i];
            questionText = x.childNodes[0].textContent;
            // Find and store the answer tag content
            x = xmlDoc.getElementsByTagName(answerTag)[i];
            answerText = x.childNodes[0].textContent;
            // Find and store hasToggleBtn tag content
            x = xmlDoc.getElementsByTagName("hasToggleBtn")[i];
            hasToggleBtn = x.childNodes[0].textContent;

            if (hasToggleBtn === "False") {
                questionsContainer += "<div class='faq-c'>" +
                                          "<img class='faq-t faq-img faq-click' src='/imgs/arrow-gry-r.png'></img>" + 
                                          "<div class='faq-q faq-click'>" + 
                                              questionText + 
                                          "</div>"+
                                          "<div class='faq-a'>" +
                                              "<p>" + answerText + "</p>" + 
                                          "</div>" +
                                      "</div>";
            } else {
                questionsContainer += "<div class='faq-c faq-tog'>" + 
                                          "<img class='faq-t faq-img faq-click' src='/imgs/arrow-gry-r.png'></img>" + 
                                          "<div class='faq-q faq-click'>" + 
                                              questionText + 
                                          "</div>"+
                                          "<div class='faq-a'>" +
                                              "<div class='faq-cta'>" +
                                                  "<div class='toggle'>" +
                                                      "<input type='checkbox' class='check'>" +
                                                      "<b class='b switch'></b>" +
                                                      "<b class='b track'></b>" +
                                                  "</div>" +
                                              "</div>" +
                                              "<p class='textNextButton'>" + answerText + "</p>" +
                                          "</div>" +
                                      "</div>";
            }
        }

        updateInnerHTML(questionsContainer, "#faqContainer");

        // Add the toggle sliding effect on the questions
        $(".faq-click").click( function () {
            var container = $(this).parents(".faq-c");
            var answer = container.find(".faq-a");
            var trigger = container.find(".faq-t");

            answer.slideToggle(200);
            
            if (trigger.hasClass("faq-o")) {
              trigger.removeClass("faq-o");
            }
            else {
              trigger.addClass("faq-o");
            }
        });
      } 
}

function printFooterDate(lang) {
    var theDate = new Date();
    var theFooterHTML = 
        document
          .querySelector("footer")
          .innerHTML;

    var vodafoneCopyrightText = "Vodafone &copy; " + theDate.getFullYear();

    var languageText = getLanguageLink(lang);

    theFooterHTML += "<p>" + vodafoneCopyrightText + " | <a href='http://www.vodafone.gr'>Vodafone.gr</a> | " + languageText + "</p>";
    updateInnerHTML(theFooterHTML, "footer");
    updateInnerHTML(languageText, ".languageDiv");
    
}

function getLanguageLink(lang) {
  var languageLink = "";
  if (lang === "en") {
        languageLink = "<a href='questionsPage.html?lang=gr' title='Συχνές Ερωτήσεις'>Ελληνικά</a>";
    } else {
        languageLink = "<a href='questionsPage.html?lang=en' title='Frequently asked questions'>English</a>";
    }
  return languageLink;
}

function loadHeader(lang) {
    if (lang === "en") {
        updateTextContent("Frequently asked Questions", ".faq-header");
    } else {
        updateTextContent("Συχνές Ερωτήσεις", ".faq-header");
    }
}

/************************************************************************
 * Helper Functions
 ************************************************************************/

function updateTextContent(newText, cssTag) {
    document
      .querySelector(cssTag)
      .textContent = newText;
}

function updateInnerHTML(newText, cssTag) {
    document
      .querySelector(cssTag)
      .innerHTML = newText;

    return true;
}

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/************************************************************************
 * MAIN
 ************************************************************************/
document.addEventListener("DOMContentLoaded", 
    function(event){
        // whatever inserted in here will be executed
        // after the content has been loaded
        var lang = getParameterByName("lang");
        loadHeader(lang);
        makeCorsRequest(lang);
        printFooterDate(lang);
    }
);