<?php 

function getData($path) {
    $path = str_replace("#", "%23", $path);
    $path = str_replace("+", "%2B", $path);
    $path = str_replace("Æ", "%C3%86", $path);
    $path = str_replace("æ", "%C3%A6", $path);
    $path = str_replace("Ø", "%C3%98", $path);
    $path = str_replace("ø", "%C3%B8", $path);
    $path = str_replace("Å", "%C3%85", $path);
    $path = str_replace("å", "%C3%A5", $path);
    $url = 'https://www.vegvesen.no/nvdb/api'.$path;

    $options = array(
        'http'=>array(
        'method'=>"GET",
        'header'=>"Accept: application/vnd.vegvesen.nvdb-v1+json"
        )
    );
    $context = stream_context_create($options);
      
    $output = file_get_contents($url, false, $context); 
      
    return $output;
}

if (isset($_GET['path'])) {
    $data = getData($_GET['path']);
    print_r($data);
}


?>