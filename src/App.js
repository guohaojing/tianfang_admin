import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import Cases from './js/News';
import Cases2 from './js/Advantage';
import System from './js/System';
import Supers from './js/Supers';
import Gold from './js/Gold';
import Design from './js/Design';
import Vi from './js/Vi';
import Img from './js/Img';
import Prize from './js/Prize';
import './css/admin.css';
import './css/pintuer.css';
import './css/css.css';
import './css/vi.css';
import './css/news.css';
import './css/system.css';
import './css/supers.css';

class App extends Component {
	    componentDidMount=function () {
	  $(".leftnav h2").click(function(){
  	  $(this).next().slideToggle(200);	
  	  $(this).toggleClass("on"); 
    })
  $(".leftnav ul li a").click(function(){
  	    $("#a_leader_txt").text($(this).text());
    		$(".leftnav ul li a").removeClass("on");
  		$(this).addClass("on");
    })
    $("#cases").click(function(){
    	$(".admin").children().hide()
    	$(".cases").show()
    	$(".bread li:nth-child(2)").text("NEWS资讯")
  })
        $("#cases2").click(function(){
    	$(".admin").children().hide()
    	$(".cases2").show()
    	$(".bread li:nth-child(2)").text("ADVANTAGE优势")
  })
        $("#system").click(function(){
      $(".admin").children().hide()
      $(".system").show()
      $(".bread li:nth-child(2)").text("网络+互动")
  })
        $("#supers").click(function(){
      $(".admin").children().hide()
      $(".supers").show()
      $(".bread li:nth-child(2)").text("空间+导视")
  })
         $("#gold").click(function(){
      $(".admin").children().hide()
      $(".gold").show()
      $(".bread li:nth-child(2)").text("GOLD")
  })
         $("#design").click(function(){
      $(".admin").children().hide()
      $(".design").show()
      $(".bread li:nth-child(2)").text("DESIGN")
  })
      $("#vi").click(function(){
          $(".admin").children().hide()
          $(".vi").show()
          $(".bread li:nth-child(2)").text("标志+VI")
      })
      $("#prize").click(function(){
          $(".admin").children().hide()
          $(".prize").show()
          $(".bread li:nth-child(2)").text("PRIZE")

      })
      $("#img").click(function(){
          $(".admin").children().hide()
          $(".img").show()
          $(".bread li:nth-child(2)").text("轮播")

      })
	  }
  render() {
    return (
<div className="App">
  <div className="header bg-main">
    <div className="logo margin-big-left fadein-top">
      <h1>后台管理中心</h1>
    </div>
  </div>
  <div className="leftnav">
    <div className="leftnav-title"><strong><span className="icon-list"></span>菜单列表</strong></div>
    <h2><span className="icon-user"></span>基本设置</h2>
    <ul>
      <li><a><span className="icon-caret-right"></span>网站设置</a></li>
      <li><a><span className="icon-caret-right"></span>单页管理</a></li>
      <li><a><span className="icon-caret-right"></span>栏目管理</a></li>
    </ul>   
    <h2><a><span className="icon-pencil-square-o"></span>栏目管理</a></h2>
    <ul>
      <li><a><span className="icon-caret-right"></span>内容管理</a></li>
      <li><a><span className="icon-caret-right"></span>添加内容</a></li>
      <li><a><span className="icon-caret-right"></span>分类管理</a></li> 
      <li id="cases"><a><span className="icon-caret-right"></span>NEWS资讯</a></li>   
      <li id="cases2"><a><span className="icon-caret-right"></span>ADVANTAGE优势</a></li> 
      <li id="system"><a><span className="icon-caret-right"></span>网络+互动</a></li> 
      <li id="supers"><a><span className="icon-caret-right"></span>空间+导视</a></li>
      <li id="gold"><a><span className="icon-caret-right"></span>GOLD</a></li>
      <li id="design"><a><span className="icon-caret-right"></span>DESIGN</a></li>
      <li id="vi"><a><span className="icon-caret-right"></span>标志+VI</a></li>    
      <li id="prize"><a><span className="icon-caret-right"></span>PRIZE</a></li> 
      <li id="img"><a><span className="icon-caret-right"></span>轮播</a></li>       
    </ul>  
  </div>
  <ul className="bread">
    <li> 首页</li>
    <li>网站信息</li>
  </ul>
  <div className="admin">
    <div className="cases"><Cases></Cases></div>
    <div className="cases2"><Cases2></Cases2></div>
    <div className="system"><System></System></div>
    <div className="supers"><Supers></Supers></div>
    <div className="gold"><Gold></Gold></div>
    <div className="design"><Design></Design></div>
    <div className="vi"><Vi></Vi></div>
    <div className="prize"><Prize></Prize></div>
    <div className="img"><Img></Img></div>
    <p>后台管理系统</p>
   </div>
</div>
    );
  }
}

export default App;
