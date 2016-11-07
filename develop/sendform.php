<?php
error_reporting(0);
$token = "token";

if(isset($_POST['submit']) and $_POST['submit']!=''){
    
    $send = array(
		    'name' => (isset($_POST['name'])) ? $_POST['name'] : '',
		    'question' => (isset($_POST['question'])) ? $_POST['question'] : '',
		    'phone' => (isset($_POST['phone'])) ? $_POST['phone'] : '',
		    'email' => (isset($_POST['email'])) ? $_POST['email'] : '',
		    'resend' => 1
		);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,"http://resiver.com/?p=theme&token=".$token);
    //curl_setopt($ch, CURLOPT_URL,"localhost/zayavki/index.php?token=".$token);
    
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; CrawlBot/1.0.0)');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT , 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_ENCODING, "");
    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);    # required for https urls
    curl_setopt($ch, CURLOPT_MAXREDIRS, 15);            
    
    
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt(
	    $ch, CURLOPT_POSTFIELDS, 
	      http_build_query($send)
	    );

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $server_output = curl_exec ($ch);
    curl_close ($ch);
 
    if($server_output=="OK"){    
	
    }else{    
	
		//unset($send['resend']);
		//mail("", "Zayavka CURl FAILS", implode(" || ", $send)." server seys: ".$server_output);
		
    }
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>спасибо за заявку</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Refresh" content="3; URL=/" />
<script src="//st.yagla.ru/js/y.c.js?h=yagla"></script>
</head>

<body>
<center><h1>Спасибо за заявку!</h1></center>
<!-- Yandex.Metrika counter --> 
<script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter444 = new Ya.Metrika({ id:444, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <noscript><div><img src="https://mc.yandex.ru/watch/444" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->
</body>
</html>
