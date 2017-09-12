//Agregar el nombre de nuestro Canal y la API de Google
var channels_name='UCVZc5giB1D4MoUr9RgcYGjw', //Solo la parte del nombre de mi canal, Ejemplo: https://www.youtube.com/user/GoogleDevelopers
channels_title='Un titulo que quiera mostrar',
apikey='AIzaSyDrELAnWOQx0xmMOOrRlMiGsLTzLxY3FD0'

//Instanciamos nuestros videos con la API de Google.
$.ajax({
url: 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=' + channels_name + '&key=' + apikey,
crossDomain: true,
dataType: 'json'
}).done(function(a) {
var b = a.items[0].contentDetails.relatedPlaylists.uploads,
chid = a.items[0].id,
nekpag = '';
youtube_video_list(b, apikey, nekpag, channels_title, chid, channels_name)
});

//Listamos todos los videos de nuestro canal de Youtube y creamos botones para ver mas videos del canal.
function youtube_video_list(f, g, h, j, k, l) {
$.ajax({
url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + f + '&key=' + g + '&pageToken=' + h,
dataType: 'json'
}).done(function(c) {
var d = '';
d += 'Selecciona otro video para visualizarlo:';
d += '<i class="fa fa-fast-backward ibacordotcom_vid_prev" title="Videos anteriores"></i> ';
d += '<i class="fa fa-fast-forward ibacordotcom_vid_next" title="Siguientes videos"></i></div><div class="ibacordotcom-vid-bottom">';
$.each(c.items, function(i, a) {
var b = c.items[i].snippet.resourceId.videoId;
getwaktu(b, i, g);
d += '<div class="col-md-2">'
d += '<a href="#">'
d += '</a><div class="ibacordotcom-play"><div class="ibacordotcom_youtube_thumb"><img src="' + c.items[i].snippet.thumbnails.default.url + '" alt="ibacor" class="preViewTube" /><span class="ibacordotcom-vid-tm' + i + '"></span></div>';
d += c.items[i].snippet.title + '</div>'
d += ''
d += '</div>'
});
d += '</div>';
$('.ibacordotcom_youtube_channels').html(d);
if (c.prevPageToken == null) {
var e = $(".ibacordotcom-play").attr("data-vvv");
youtube_det(e, k, l, g)
}
if (c.prevPageToken != null) {
$('.ibacordotcom_vid_prev').click(function() {
var a = c.prevPageToken;
youtube_video_list(f, g, a, j, k, l);
return false
})
}
$('.ibacordotcom_vid_next').click(function() {
var a = c.nextPageToken;
youtube_video_list(f, g, a, j, k, l);
return false
});
$(".ibacordotcom-play").each(function() {
$(this).click(function() {
var a = $(this).attr("data-vvv");
$('div').removeClass('ibacordotcom-vid-active');
$(this).addClass('ibacordotcom-vid-active');
youtube_det(a, k, l, g);
return false
})
})
})
}

// Mostramos datos de el ultimo video con un contenedor de la vista principal para reproducir todos los Videos.
function youtube_det(c, d, e, g) {
$.ajax({
url: 'https://www.googleapis.com/youtube/v3/videos?id=' + c + '&key=' + g + '&part=snippet,statistics',
dataType: 'json'
}).done(function(a) {
var b = '',
viewc = a.items[0].statistics.viewCount,
likc = a.items[0].statistics.likeCount,
likd = a.items[0].statistics.dislikeCount,
category = '',
judul = a.items[0].snippet.localized.title,
desc = a.items[0].snippet.localized.description;
b += 'Ultimo Video subido:';
b += '<div class="embed-responsive embed-responsive-4by3">'
b += '';
b += '</div>';
b += '<div class="ibacordotcom-vid-box"><h3>' + judul + '</h3><hr />';
/*
b += '
<div class="ibacordotcom-vid-box-user">

<a href="http://www.youtube.com/channel/' + d + '" target="_BLANK"><span id="ibacordotcom-user-img"></span> <span class="ibacordotcom-uploader">' + a.items[0].snippet.channelTitle + '</span></a>
<h4 class="pull-right">' + addCommas(viewc) + '</h4>
</div>
</div>
';
b += '
<div class="ibacordotcom-vid-box">

<i class="fa fa-clock-o"> <span>' + _timeSince(new Date(a.items[0].snippet.publishedAt).getTime()) + '</span></i><i class="fa fa-thumbs-down pull-right"> ' + addCommas(likd) + '</i><i class="fa fa-thumbs-up pull-right"> ' + addCommas(likc) + '</i>

<hr />

' + urlify(desc).replace(/\n/g, '
') + '

</div>
';
gplus(e, g);
*/
$('.ibacordotcom_vid_play').html(b)
})
}

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
