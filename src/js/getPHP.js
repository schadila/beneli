/**
 * Created by nino.kueenzi on 09.01.17.
 */
$(document).ready(function(){
    var endpoint = "./php/API.php/gifts";
    $.get(endpoint, function (res) {

        var i = 0;
        res.length && res.forEach(function (gift) {

            if(gift.rest>0 && gift.active == 1){
                var template;
                var select;
                var priceFull;
                var online = "";
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
                if(gift.type==1){var online = "Betrag"}

                template =  '<div class="gift gift-'+i+'">';
                template +=     '<div class="teaser-image" style="background-image:url('+gift.image+')">';
                template +=         '<div class="price">'+gift.price+'<br>CHF</div>';
                template +=     '</div>';
                template +=     '<h1><a class="no-underline" href="schenken.html?product='+gift.id+'&pay=0">'+gift.name+'</a></h1>';
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
                template +=     '<a href="schenken.html?product='+gift.id+'&pay='+priceFull+'&toform=true" class="gift-button gift-button-weiter">Weiter</a>';
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
                            $(myClass + " .range-slider").css("background-color", "rgba(0,0,0, .2)");

                        }
                    },
                    onSlideEnd: function(position, value){

                    }
                });
            }

            i = i+1;
        });
    });



});