//Agregar el nombre de nuestro Canal y la API de Google
var channels_name='UCVZc5giB1D4MoUr9RgcYGjw', //Solo la parte del nombre de mi canal, Ejemplo: https://www.youtube.com/user/GoogleDevelopers
channels_title='Un titulo que quiera mostrar',
apikey='AIzaSyDrELAnWOQx0xmMOOrRlMiGsLTzLxY3FD0'

//Instanciamos nuestros videos con la API de Google.
$.ajax({
//url: 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=' + channels_name + '&key=' + apikey,
url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCVZc5giB1D4MoUr9RgcYGjw&maxResults=100&q=las+partes+que+me+parten+en+partes'+ '&key=' + apikey,
crossDomain: true,
dataType: 'json'
}).done(function(a) {
//var b = a.items[0].contentDetails.relatedPlaylists.uploads,
chid = a.items[0].id,
nekpag = '';

var d = '';
for(i=0;i<a.lenght;i++){
var b = a.items[i].snippet.resourceId.videoId;
getwaktu(b, i, g);
d += '<div class="col-md-2">'
d += '<a href="#">'
d += '</a><div class="ibacordotcom-play"><div class="ibacordotcom_youtube_thumb"><img src="' + c.items[i].snippet.thumbnails.default.url + '" alt="ibacor" class="preViewTube" /><span class="ibacordotcom-vid-tm' + i + '"></span></div>';
d += c.items[i].snippet.title + '</div>'
d += ''
d += '</div>'
}
$('.ibacordotcom_youtube_channels').html(d);
});
/*
if (c.prevPageToken == null) {
var e = $(".ibacordotcom-play").attr("data-vvv");
youtube_det(e, k, l, g)
*/
//youtube_video_list(b, apikey, nekpag, channels_title, chid, channels_name)
};


//Obtenemos detalles y la duración del video.
function getwaktu(c, i, g) {
$.ajax({
url: 'https://www.googleapis.com/youtube/v3/videos?id=' + c + '&key=' + g + '&part=contentDetails',
dataType: 'json'
}).done(function(a) {
var b = a.items[0].contentDetails.duration,
dataw = '',
menit = '',
detik = '';
if(b.match(/M/g)){
dataw = b.split('M');
menit = dataw[0].replace('PT','');
if(dataw[1] != ''){
detik = dataw[1].replace('S','');
}else{
detik = '00';
}
}else{
dataw = b.split('PT');
menit = '00';
detik = dataw[1].replace('S','');
}
$('.ibacordotcom-vid-tm' + i).html(menit + ':' + detik)
})
}

//Colocamos la URL de el video.
function urlify(b) {
var c = /(https?:\/\/[^\s]+)/g;
return b.replace(c, function(a) {
return '<a href="' + a + '" rel="nofollow" target="_BLANK">' + a + '</a>'
})
}

//Obtenemos la actividad en Google + (Optional)
function gplus(c, g) {
var d = 'https://www.googleapis.com/plus/v1/people/',
apiend = '/activities/public',
fields = 'items(actor(image(url)))';
$.ajax({
url: d + '+' + c + apiend + '?key=' + g + '&fields=' + fields + '&maxResults=1',
crossDomain: true,
dataType: 'jsonp'
}).done(function(a) {
var b = a.items,
i = 0,
html = '';
for (i = 0; i < b.length; i += 1) {
html += '<img src="' + b[i].actor.image.url + '" alt="" />'
}
$('#ibacordotcom-user-img').html(html)
})
}

//Obtenemos Fecha de publicación (Descomentar en el código para ver)
function _timeSince(a) {
var s = Math.floor((new Date() - a) / 1000),
i = Math.floor(s / 31536000);
if (i > 1) {
return i + " years ago"
}
i = Math.floor(s / 2592000);
if (i > 1) {
return i + " months ago"
}
i = Math.floor(s / 86400);
if (i > 1) {
return i + " days ago"
}
i = Math.floor(s / 3600);
if (i > 1) {
return i + " hours ago"
}
i = Math.floor(s / 60);
if (i > 1) {
return i + " minutes ago"
}
return Math.floor(s) + " seconds ago"
}
