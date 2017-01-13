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
                var online = "";
                var restprice = (100*(gift.rest/gift.anteile));
                var collected = 100-(100*(gift.rest/gift.anteile));
                if(collected==0){
                    collected = 0;
                    restprice = "100%";
                }else{
                    collected = collected + "%";
                    restprice = restprice + "%";
                }
                if(gift.type==1){var online = "Betrag"}

                template =  '<div class="gift gift-'+i+'">';
                template +=     '<div class="teaser-image" style="background-image:url('+gift.image+')">';
                template +=         '<div class="price">'+gift.price+'<br>CHF</div>';
                template +=     '</div>';
                template +=     "<h1>"+gift.name+"</h1>";
                var text =  gift.text;
                if(text.length > 250){
                    text = text.substr(0,250);
                    text += "...";
                }
                template +=     '<p>'+text+'</p>';
                if(gift.type==1){
                    template +=     '<p class="sum">CHF 0</p>';
                    template +=         '<div class="range-wrapper"><table><tr><td style="width:'+collected+'"><div class="range-slider" ></div></td><td style="width:'+restprice+'"><input data-rangeslider name="asdfasdf" type="range" min="0" max="'+(gift.rest*(gift.price/gift.anteile))+'" step="10" value="0" data-orientation="horizontal"></td></tr></table></div>';
                    template +=     '<p style="text-align: center">'+((gift.anteile-gift.rest)*10)+'.- von '+Math.round(gift.price)+'.- Fr bereits verschenkt</p>';
                }else{
                    template +=     '<p class="sum">CHF '+gift.price+'</p>';
                }
                template +=     '<a href="schenken.html?product='+gift.id+'" class="gift-button">'+online+' Schenken</a>';
                template +=  '</div>';



                $(".container-flex").append(template);





                $('.gift input[type="range"]').rangeslider({
                    polyfill: false,
                    onSlide: function(position, value) {
                        changeValue(this.identifier, value, gift.id, "schenken.html")
                    },
                });

            }

            i = i+1;
        });
    });

    function changeValue(e, value, id, href){
        var myId = e;
        myId = e.slice(15);
        $(".gift-"+myId).find(".sum").html("CHF "+value);
        var url = href+"?product="+id+"&pay="+value;
        console.log(url);
        $(".gift-"+myId+" .gift-button").attr("href", url);

    }

});