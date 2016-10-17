$("input[name=zip]").on("blur", function () {
    var plz = $(this).val();
    $.getJSON("/php/plz.json",
        function (result) {
            $.each(result, function (index, value) {
                if (value.PLZ == plz) {
                    $("input[name=ort]").val(value.Ortschaft);
                    return false;
                }
            });
        });
});