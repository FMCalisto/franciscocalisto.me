<html>
<body>
<?php

	$host="db.ist.utl.pt";	// o MySQL esta disponivel nesta maquina
	$user="ist170916";	// -> substituir pelo nome de utilizador
	$password="pw";	// -> substituir pela password dada pelo mysql_reset
	$dbname = $user;	// a BD tem nome identico ao utilizador

	$connection = new PDO("mysql:host=" . $host. ";dbname=" . $dbname, $user, $password, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));

	echo("<p>Connected to MySQL database $dbname on $host as user $user</p>\n");

	$sql = "SELECT * FROM account;";

	echo("<p>Query: " . $sql . "</p>\n");

	$result = $connection->query($sql);
	
	$num = $result->rowCount();

	echo("<p>$num records retrieved:</p>\n");

	echo("<table border=\"1\">\n");
	echo("<tr><td>account_number</td><td>branch_name</td><td>balance</td></tr>\n");
	foreach($result as $row)
	{
		echo("<tr><td>");
		echo($row["account_number"]);
		echo("</td><td>");
		echo($row["branch_name"]);
		echo("</td><td>");
		echo($row["balance"]);
		echo("</td></tr>\n");
	}
	echo("</table>\n");
		
        $connection = null;
	
	echo("<p>Connection closed.</p>\n");

	echo("<p>Test completed successfully.</p>\n");

?>
</body>
</html>
