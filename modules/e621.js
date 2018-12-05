var request = require("request");

function random(tags, rating, limit, callback) {
  request.get({
    "method" : "GET",
    "uri": "https://e621.net/post/index.json?tags=" + tags + "%20order:random+rating:" + rating +"&limit=" + limit,
    "followRedirect":false,
    "headers": {
      'User-Agent': 'E621APIWrapper/1.0 (by DarkmaneArweinydd on e621)'
    }
  },function (err, res, body) {
    var post = JSON.parse(body);
    var blockedtags = new Set(['father_and_son', 'young', 'cub', 'bestiality', 'human', 'r34']);
    var ts = post[0]['tags'];
    var blocked = false;
    blockedtags.forEach(function (tag){
      if (ts.includes(tag)){
        blocked = true;
      }
    });
    if (blocked) {
      console.log('contains blocked tag -- getting new image.');
      random(tags, rating, limit, callback);
    } else {
      callback(post);
    }
  });

}

module.exports = {
  random: random
}