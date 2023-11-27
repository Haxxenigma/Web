<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $myfile = fopen('form.txt', 'a') or die ("Unable to open file!");
    
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $currentDate = date("d-m-y h:i");

    fwrite($myfile, "Date: " . $currentDate . "\n");
    fwrite($myfile, "Name: " . $name . "\n");
    fwrite($myfile, "Email: " . $email . "\n");
    fwrite($myfile, "Message: " . $message . "\n");
    fwrite($myfile, "----------------------------------------\n");

    fclose($myfile);

    header("Location: ../index.html");
    echo '<script>alert("Your message has been received");</script>';
    exit;
}
?>