<?php
    // include('./conn.php');

    // $id = $_REQUEST['id'];

    // $sql = "select * from taobaogoods where id='$id'";

    // $res = $mysqli->query($sql);

    // $row = $res->fetch_assoc();

    // $json = json_encode($row);

    // echo $json;

    // $mysqli->close();
    include "conn.php";
    //获取前端传入的sid
    if(isset($_GET['sid'])){
        $sid = $_GET['sid'];
        //利用sid查找对应的数据，返回给前端。
        $result=$mysqli->query("select * from taobaogoods where sid = $sid");
        echo json_encode($result->fetch_assoc());
    }
    
?>