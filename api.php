<?php 

function getData($path) {
    $path = str_replace("#", "%23", $path);
    $path = str_replace("+", "%2B", $path);
    $path = str_replace("Å", "%C3%85", $path);
    $url = 'https://www.vegvesen.no/nvdb/api'.$path;
    // echo($url);
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