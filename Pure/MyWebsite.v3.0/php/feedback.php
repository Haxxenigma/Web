<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $myfile = fopen('feedback.txt', 'a') or die ("Unable to open file!");
    
    $username = $_POST["username"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $currentDate = date("d-m-y h:i");

    fwrite($myfile, "Date: " . $currentDate . "\n");
    fwrite($myfile, "Username: " . $username . "\n");
    fwrite($myfile, "Email: " . $email . "\n");
    fwrite($myfile, "Message: " . $message . "\n");
    fwrite($myfile, "----------------------------------------\n");

    fclose($myfile);

    header("Location: ../feedback.html");
    exit;
}
?>
