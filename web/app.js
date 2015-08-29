// Global variables holding the count of issues.
total = 0, last24Hours = 0, last7Days = 0, after7Days = 0;

// Github API sends limited no of results (100 max), so need to request in form of pages 
pageNo = 1;

//Checks the URL entered.
function checkURL() {
	url = $("#urlInput").val().trim().
        match("(http:\/\/|https:\/\/)?github\.com\/([a-zA-z_\\-0-9]+\/[a-zA-Z_\\-0-9]+)\/?");
    if (url && url[0] && $("#urlInput").val() == url[0]) {
        $("#errorDiv").hide();
        callAPI();
    }
    else {
        $("#errorMesg").html("Invalid URL. Please Use format https://github.com/[user]/[repository]");
        $("#errorDiv").show();
        updateRows();
        return false;
    }
}

// Calls the Github API (api.github.com)
function callAPI() {
	date24HoursBefore = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    date7daysBefore = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
    addLoadingGIF();
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
                pageNo++;
				updateRows(total,last24Hours,last7Days,after7Days);
                callAPI();
            }
            else {
				updateRows(total,last24Hours,last7Days,after7Days);
                removeLoadingGIF();
            }
        })
		.fail(function(e){
			$("#errorMesg").html("Error : "+e.status+" : "+e.statusText);
			$("#errorDiv").show();
			removeLoadingGIF();
		});
		
}

// Inserts the values in the Rows
function updateRows(row1,row2,row3,row4){
	$("#row1").html(row1?row1:"");
	$("#row2").html(row2?row2:"");
	$("#row3").html(row3?row3:"");
	$("#row4").html(row4?row4:"");
}

// Removes the Loading GIF from the rows
function removeLoadingGIF(){
    $("#row1").removeClass("loadingImg");
	$("#row2").removeClass("loadingImg");
	$("#row3").removeClass("loadingImg");
	$("#row4").removeClass("loadingImg");
}

// Adds the Loading GIF to the rows
function addLoadingGIF(){
    $("#row1").addClass("loadingImg");
    $("#row2").addClass("loadingImg");
    $("#row3").addClass("loadingImg");
    $("#row4").addClass("loadingImg");
}