<?php

	$connection = mysqli_connect("http://45.33.116.130/", "root", "jaejaebinks88", "wordstory");
	if(mysqli_connect_errno())
	{
		echo("console.log(db connection failed);");
	}
	else{
		$user_id = $_POST['$user_id'];
		$query = "SELECT * FROM `post` WHERE post_id = (SELECT post_id FROM `account_post` WHERE user_id = '$user_id');";
		$getPosts = mysqli_query($connection, $query);
		if(!$getPosts){
            echo("Posts failed to be retreived");
        }
        else{
			$ary = array();
            while($row = mysqli_fetch_array($getPosts)){
				$ary[] = $row;
			}
			echo(json_encode($ary));
        }
	}

?>