<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/style.css">
    <title>DECRYPTED FILE </title>
</head>

<body>

    <?php

    $doc = $_GET['doc'];

    $uploadFILE = "../DOC/" . $doc;


    $decrypt = "";
    if (strpos($doc, ".jpg") == -1) {

        $txtFile = fopen($uploadFILE, "r");

        while ($line = fgets($txtFile)) {

            if ($line != "") {
                $key = "AESKEY";
                $decrypt =  $decrypt . openssl_decrypt($line, "AES-128-ECB", $key) . "\n";
                echo $decrypt;
            } else {
                echo "ya rien mon boug";
            }
        };

        fclose($txtFile);
    } else {
        $image = file_get_contents($uploadFILE);
        $decrypt = base64_decode($image);
        file_put_contents($uploadFILE, $decrypt);
        echo '<img src="' . $uploadFILE . '"/>';
    }

    ?>

    <form action="" method="post">

        <textarea name="txt"><?= $decrypt ?></textarea>
        <input type="submit" name="formsend" value="decrypter">

    </form>

    <?php
    if (isset($_POST["formsend"])) {

        extract($_POST);

        $key = "AESKEY";
        $encrypt = openssl_encrypt($txt, "AES-128-ECB", $key);

        file_put_contents($uploadFILE, $encrypt);
    }
    ?>

</body>

</html>