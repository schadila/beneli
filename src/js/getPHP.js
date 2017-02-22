/**
 * Created by nino.kueenzi on 09.01.17.
 */
function showGifts(){
    var endpoint = "./php/API.php/gifts";

    $.get(endpoint, function (res) {

        var addCard;
        addCard = '<div class="gift edit">';
        addCard += '<div class="teaser-image" style="background-image: url(https://cdn.shopify.com/s/files/1/1581/7661/articles/Gift_large.png?v=1485338945)"></div>';
        addCard += '<h1>Neues Geschenk hinzufügen</h1>';
        addCard += '<a href="add-card.html" class="gift-button">Hinzufügen</a>';
        addCard += '</div>';

        if(getCookie("token")) $(".container-flex").append(addCard);

        var i = 0;
        res.length && res.forEach(function (gift) {

            if(gift.rest>0 && gift.active == 1){
                var template;
                var priceFull;
                var restprice = (100*(gift.rest/gift.anteile));
                var collected = 100-(100*(gift.rest/gift.anteile));
                if(collected==0){
                    collected = 0;
                    restprice = "100%";
                }else{
                    if(collected>80){
                        collected = "80%";
                        restprice = "20%";
                    }else{
                        collected = collected + "%";
                        restprice = restprice + "%";
                    }
                }
                if(gift.type==1) priceFull=10;
                else priceFull = gift.price;

                template =  '<div class="gift gift-'+i+'">';
                template +=     '<a class="no-underline teaserimage_link" href="schenken.html?product='+gift.id+'&pay='+Math.round(priceFull)+'"><div class="teaser-image" style="background-image:url('+gift.image+')">';
                if(getCookie("token")) template += '<a class="edit button" href="edit-card.html?product='+gift.id+'">Bearbeiten</a>';
                template +=     '</div></a>';
                template +=     '<h1><a class="no-underline" href="schenken.html?product='+gift.id+'&pay='+Math.round(priceFull)+'">'+gift.name+'</a></h1>';
                var text =  gift.text;
                if(text.length > 250){
                    text = text.substr(0,250);
                    text += "...";
                }
                // template +=     '<p>'+text+'</p>';
                if(gift.type==1){
                    template +=     '<p class="i-give">Ich schenke:</p>'
                    template +=     '<p class="sum">CHF 0</p>';
                    template +=         '<div class="range-wrapper"><table><tr><td style="width:'+collected+'"><div class="range-slider" ></div></td><td style="width:'+restprice+'"><input data-rangeslider name="" type="range" min="0" max="'+(gift.rest*(gift.price/gift.anteile))+'" step="10" value="0" data-orientation="horizontal"></td></tr></table></div>';
                    template +=     '<p style="text-align: center">'+((gift.anteile-gift.rest)*10)+'.- von '+Math.round(gift.price)+'.- Fr bereits verschenkt</p>';
                    priceFull = 0;
                }else{
                    template +=     '<p class="sum">CHF '+gift.price+'</p>';
                    priceFull = gift.price;
                }
                template +=     '<a href="schenken.html?product='+gift.id+'&pay='+priceFull+'&toform=true" class="gift-button gift-button-weiter">Schenken</a>';
                // template +=     '<a href="schenken.html?product='+gift.id+'&pay='+priceFull+'&toform=false" class="gift-button gift-button-details"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>';
                template +=  '</div>';

                $(".container-flex").append(template);

                $('.gift input[type="range"]').rangeslider({
                    polyfill: false,
                    class: i,
                    onSlide: function(position, value) {
                        changeValue(value, gift.id, "schenken.html", this.options.class)
                        var myClass= ".gift-"+this.options.class;
                        var max = $(myClass+" input[type='range']").attr("max");
                        var percent = 1-(value/max);
                        if(value == max){
                            $(myClass + " .rangeslider__fill").css("background-color", "rgba(120,200,10, 1)");
                            $(myClass + " .range-slider").css("background-color", "rgba(120,200,10, 1)");
                        }else{
                            $(myClass + " .rangeslider__fill").css("background-color", "rgba(171,153,126,1)");
                            $(myClass + " .range-slider").css("background-color", "rgba(0,0,0, .65)");

                        }
                    },
                    onSlideEnd: function(position, value){

                    }
                });
            }

            i = i+1;
        });
    });



};