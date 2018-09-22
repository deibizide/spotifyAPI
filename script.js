(function() {
    var sel = $("#sel");
    var go = $("#go");
    var input = $("#input");
    var nextUrl;
    var more = $("#more");

    go.on("click", function() {
        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            data: {
                query: input.val(),
                type: sel.val()
                // limit: 5
            },
            success: function(data) {
                data = data.artists || data.albums;
                $(".result").html(resulttobehtml(data));
                if (data.next) {
                    nextUrl = data.next.replace(
                        "api.spotify.com/v1/search",
                        "elegant-croissant.glitch.me/spotify"
                    );

                    more.show();
                } else {
                    more.hide();
                }
                console.log(data);
            }
        });
    });
    function resulttobehtml(data) {
        var resultHtml = "";

        resultHtml += "Results for: " + input.val();
        for (var i = 0; i < data.items.length; i++) {
            resultHtml += '<div class="results">';

            if (data.items[i].images.length === 0) {
                resultHtml += `<img src='http://demo.makitweb.com/broken_image/images/noimage.png'>`;
            } else {
                resultHtml += `<img src=${data.items[i].images[0].url}>`;
            }
            resultHtml += "<div class='name'>" + data.items[i].name + " </div>";
            resultHtml += "</div>";
        }
        return resultHtml;
    }

    more.on("click", function() {
        $.ajax({
            url: nextUrl,
            success: function(data) {
                data = data.artists || data.albums;
                $(".result").append(resulttobehtml(data));
                if (data.next) {
                    nextUrl = data.next.replace(
                        "api.spotify.com/v1/search",
                        "elegant-croissant.glitch.me/spotify"
                    );
                    more.show();
                } else {
                    more.hide();
                }
                console.log(data);
            }
        });
    });
})();
