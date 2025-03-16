<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/stile.css">
    <title>Document</title>
</head>

<body>
    <h1>PHP ENCRYPT FILE <div class="underline"></div>
    </h1>
    <div class="app">

        <div class="envoie">

            <form action="" method="post" enctype="multipart/form-data">
                <input type="file" name="fileToUp" id="send">
                <input type="submit" name="formsend" value="ENVOYER">
            </form>
        </div>
        <div class="result">

            <?php
            if (isset($_POST["formsend"])) {
                $uploadDIR = '../DOC/';
                $uploadFILE = $uploadDIR . basename($_FILES['fileToUp']['name']);
                if (move_uploaded_file($_FILES['fileToUp']['tmp_name'], $uploadFILE)) {
                    // ecrypt txt fichier 
                    $encrypt = "";
                    if (strpos($uploadFILE, ".jpg") == -1) {

                        $txtFile = fopen($uploadFILE, "r");

                        while ($line = fgets($txtFile)) {

                            if ($line != "") {

                                echo $line . " <br>";
                                $key = "AESKEY";
                                $encrypt =  $encrypt . openssl_encrypt($line, "AES-128-ECB", $key) . "\n";
                            } else {
                                echo "ya rien mon boug";
                            }
                        };

                        fclose($txtFile);
                        file_put_contents($uploadFILE, $encrypt);
                    } else {

                        $image = file_get_contents($uploadFILE);
                        echo "la bite";
                        $encrypt = base64_encode($image);
                    }
                }
            }

            $scanDir = scandir("../DOC");
            foreach ($scanDir as $fichier) {

            ?>

                <a href="bdd.php?doc=<?= $fichier ?>"><?= $fichier ?></a>

            <?php


            }

            ?>
        </div>
    </div>

</body>

</html>