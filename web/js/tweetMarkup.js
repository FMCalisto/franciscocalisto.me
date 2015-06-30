//this function gets used as a call back in the getTweets function call - after json callback
    startTwitter = function(data){

        var dataArr = [];

        for(a = 0; a &lt; data.length; a++){
            dataArr.push({avatar: data[a]['user']['profile_image_url'], text: linkify(data[a].text), timeAgo: timeAgo(data[a]['created_at'], null, 4), user: data[a].user.screen_name});
        }

        $('#tweetMarkup').render(dataArr).appendTo('#tweetsCntr');

        twitterObj.loaderOff();
    }