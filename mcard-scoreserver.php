<?php

require 'C:\xampp\htdocs\fyp\config.php';

$dbservername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "dermawan";

$lnk = mysqli_connect($dbservername, $dbusername, $dbpassword, $dbname);

if (!$lnk) {
    die("Database connection failed");
}

function updateMemoryscore($id, $mcard_score, $lnk)
{
    $id = mysqli_real_escape_string($lnk, $id);
    $mcard_score = intval($mcard_score);
    
    // Update highscore set mcard_score = $mcard_score where id = '$id'
    $query = "UPDATE highscore SET memory_score = $mcard_score WHERE id = '$id'";
    
    $rs = mysqli_query($lnk, $query);
    
    if (!$rs) {
        return false;
    }
    
    return true;
}

// Check if session ID exists and quiz score is provided
if (isset($_SESSION["id"]) && isset($_POST["memory_score"])) {
    $id = $_SESSION["id"];
    $mcard_score = $_POST["memory_score"];
    
    if (updateMemoryscore($id, $mcard_score, $lnk)) {
        echo "Score is saved";
    } else {
        echo "Failed to save score";
    }
} else {
    echo "Session ID or memory score not provided";
}
?>
