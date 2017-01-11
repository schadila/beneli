/**
 * Created by nino.kueenzi on 09.01.17.
 */
$(document).ready(function(){
    var endpoint = "./php/API.php/gifts";
    $.get(endpoint, function (res) {

        res.length && res.forEach(function (gift) {
            if(gift.rest>0 && gift.active == 1){
                var template;
                var online = "";
                var restprice = 100-(100*(gift.rest/gift.anteile));
                if(gift.type==1){var online = "<small>(Überweisung)</small>"}

                template =  '<div class="gift">';
                template +=     '<div class="teaser-image" style="background-image:url('+gift.image+')">';
                template +=         '<div class="price">'+gift.price+'<br>CHF</div>';
                template +=     '</div>';
                if(gift.partial == 1){
                    template +=     '<div class="diagramm">';
                    template +=         '<div class="rest" data-restprice="'+restprice+'"></div>';
                    template +=     '</div>';
                }
                template +=     "<h1>"+gift.name+"</h1>";

                template +=     '<p>'+gift.text+'</p>';
                template +=     '<table><tr>';
                template +=     '<td>'+gift.anteile+'</td><td>'+gift.rest+'</td><td>'+(gift.price/gift.anteile)+'</td>';
                template +=     '</tr><tr><td>Anteile</td><td>Verfügbar</td><td>CHF</td></tr></table>';
                template +=     '<a href="schenken.html?product='+gift.id+'" class="gift-button">Schenken '+online+'</a>';
                template +=  '</div>';

                $(".container-flex").append(template);
            }
        });
        $(".rest").each(function(){
            $(this).width($(this).data("restprice")+"%");
        });
    });

});