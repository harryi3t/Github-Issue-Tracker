function callApi() {
    $("#row1").addClass("loadingImg");
    $("#row2").addClass("loadingImg");
    $("#row3").addClass("loadingImg");
    $("#row4").addClass("loadingImg");
    date24HoursBefore = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    date7daysBefore = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));

    url = $("#urlInput").val().trim().
        match("(http:\/\/|https:\/\/)?github\.com\/([a-zA-z_\\-0-9]+\/[a-zA-Z_\\-0-9]+)\/?");
    if (url && url[0] && $("#urlInput").val() == url[0]) {
        $("#errorMsg").hide();

        total = 0, last24Hours = 0, last7Days = 0, after7Days = 0;
        pageNo = 1;
        callPage();
    }
    else {
        $("#errorMsg").html("Invalid URL. Please Use format https://github.com/[user]/[repository]");
        $("#errorMsg").show();
        //setTimeout(function () { $("#errorMsg").hide(); }, 3000);
        $("#row1").removeClass("loadingImg");
        $("#row2").removeClass("loadingImg");
        $("#row3").removeClass("loadingImg");
        $("#row4").removeClass("loadingImg");
        return;
    }
}
function callPage() {
    console.log("https://api.github.com/repos/" + url[2] + "/issues?state=all&per_page=100&page=" + pageNo);
    $.get("https://api.github.com/repos/" + url[2] + "/issues?state=all&per_page=100&page=" + pageNo)
        .done(function (d) {
            console.log(d);
            x = d;
            total += d.length;
            for (var i = 0 ; i < d.length ; i++) {
                var thisDate = new Date(d[i].created_at);
                if (thisDate >= date24HoursBefore) {
                    last24Hours++;
                } else if (thisDate >= date7daysBefore) {
                    last7Days++;
                } else {
                    after7Days++;
                }
            }
            if (d.length == 100) {
                console.log(d.length);
                pageNo++;
                $("#row1").html(total);
                $("#row2").html(last24Hours);
                $("#row3").html(last7Days);
                $("#row4").html(after7Days);
                callPage();
            }
            else {
                $("#row1").html(total);
                $("#row2").html(last24Hours);
                $("#row3").html(last7Days);
                $("#row4").html(after7Days);

                $("#row1").removeClass("loadingImg");
                $("#row2").removeClass("loadingImg");
                $("#row3").removeClass("loadingImg");
                $("#row4").removeClass("loadingImg");
            }
        })
		.fail(function(e){
			$("#errorMsg").html("Error : "+e.status+" : "+e.statusText);
			$("#errorMsg").show();
			$("#row1").removeClass("loadingImg");
			$("#row2").removeClass("loadingImg");
			$("#row3").removeClass("loadingImg");
			$("#row4").removeClass("loadingImg");
		});
		
}