;(function(angular) {

  var module = angular.module("memory-game", []);

  module.controller('CardController', ['$scope','$timeout', function($scope,$timeout) {

    var visibleCard = null;
    var animationRunning = false;

    var cardComparator = function(card1, card2) {

        return (card1.cardId == card2.cardId)
    }

    var shuffleCards = function(size) {

      var cardDeck = new Array();

      for(var k =0;k<size;k++) {

        var type = Math.floor(Math.random() * 4) + 1;

        var card = {isVisible : false, css : "memory-game-card-cover-style-" + type, cardId : k, isPair : false, enabled : true};

        var cardPair = {isVisible : false, css : "memory-game-card-cover-style-" + type, cardId : k, isPair : true, enabled : true};

        cardDeck.push(card);
        cardDeck.push(cardPair);

      }

      for(var j, x, i = cardDeck.length; i; j = Math.floor(Math.random() * i), x = cardDeck[--i], cardDeck[i] = cardDeck[j], cardDeck[j] = x);

      return cardDeck;
    };

    var disableCard = function(card) {
      card.enabled = false;

      card.css = "memory-game-card-cover-style-disabled";
    }

    $scope.cardList = shuffleCards(4);

    $scope.cardClick = function(card) {

      if(!card.enabled || animationRunning) {

        return;

      } else if(visibleCard == null) {

        visibleCard = card;

      } else if(cardComparator(visibleCard, card)) {

        disableCard(visibleCard);
        disableCard(card);

        visibleCard = null;

      } else {

        animationRunning = true;

        $timeout(function() {

          visibleCard.isVisible = false
          card.isVisible = false;

          visibleCard = null;
          animationRunning = false;

        },1000);
      }

      card.isVisible = true;
    }
  }]);

})(window.angular);
