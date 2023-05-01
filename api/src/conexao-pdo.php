<?php
function conexaoPDO( $nomeBanco ) {
    return new PDO( "mysql:dbname=${nomeBanco};host=localhost;", 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ] );
}

?>