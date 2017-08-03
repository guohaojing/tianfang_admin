import React, { Component } from 'react';
import $ from 'jquery';
import conf from './../config';
class Vi extends Component {
	constructor(){
       super();
       this.state={
            pic_list:[]  ,
            id:null   
       };
    };
	componentDidMount(){
        $.ajax({
            type:"post",
            url:`${conf.url}/tianfang/pic_list`,
            async:"true",
            success:function(pp){
     console.log(pp)
                this.setState({
                    pic_list:pp
                })
            }.bind(this),
            error:function(){
                alert('失败了');
            }
        });
    }
    fn=function(event){
    	var aa=event.target.parentElement.firstElementChild.innerHTML
    	this.setState({
    		id:aa
    	})
		$('.alert').css({
		'display':"block"
		})
		$('.wrap').css({
			'display':"none"
		})
    }.bind(this);
    fns=function(event){
		var aa=event.target
			var  id=aa.parentElement.firstElementChild.innerHTML
			$.ajax({
				type:"post",
				url:`${conf.url}/tianfang/dlcases1`,
				data:{"id":id},
				success:function(e){				
				for(var i in this.state.pic_list){
						if(this.state.pic_list[i].id==id){
							var aa=this.state.pic_list.splice(i,1)
							this.setState({
								pic_list:this.state.pic_list
							})
						}
					}
				console.log(this.state.pic_list)
      		}.bind(this),
      		error:function(){
      			alert("失败了")
      		}
			});
    }.bind(this);
    ok=function(){
    	$('.alert').css({
    		'display':'none'
    	})
    	$('.wrap').css({
			'display':"block"
		})
    	 $.ajax({
            type:"post",
            url:`${conf.url}/tianfang/upprize`,
            async:"true",
            data:{'id':this.state.id,"title":$("#ftext").val()},
            success:function(pp){
            	console.log(pp)
                alert(pp)
            }.bind(this),
            error:function(){
                alert('失败了');
            }
        });
    }.bind(this)
    setFiles = function(element) {
        console.log(element)
        var files = []
        files = element.files[0]
        var fd = new FormData(); //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd)
        $.ajax({
            type: "post",
            url: `${conf.url}/tianfang/incases4`,
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function(e) {
                if(element.id=="ppo"){
                    $.ajax({
                    type: "post",
                    url: `${conf.url}/tianfang/alcases4`,
                    data: {
                        "id": this.state.id 
                    },
                    success: function(e) {
                        console.log(e)
                    }.bind(this),
                    error: function() {
                        console.log("失败了")
                    }
                });  
                }
                
                
                
            }.bind(this),
            error: function() {
                console.log("失败了")
            }
        });

    }.bind(this)
    add=function(event){
    	var aa=event.target.parentElement.firstElementChild.innerHTML
    	this.setState({
    		id:aa
    	})
    	$('.add_box').css({
    		'display':"block"
    	})
    	$('.box_bottom').css({
    		'display':"none"
    	})
    	
    }.bind(this)
    yes=function(){
    	$('.add_box').css({
    		'display':'none'
    	})
    	$('.box_bottom').css({
			'display':"block"
		})
		$.ajax({
				type:"post",
				url:`${conf.url}/tianfang/accases1`,
				data:{"text":$("#bb").val()},
				success:function(e){				
				alert(e)
      		}.bind(this),
      		error:function(){
      			console.log("失败了")
      		}
			});		
		}.bind(this)
    render() {
        return (
        	<div className="box">
        		<div className="add" onClick={this.add}>+</div>	
        		<div className="box_bottom">
        			<ul>
						<li className="uid">id</li>
        				<li className="title">title</li>
        				<li className="imgs">img</li>
        			{this.state.pic_list.map(function(pp,i){
        				return(<div key={i} className="wrap">
        						<div className="uids">{pp.id}</div>
        						<div className="word">{pp.after}</div>
        						<button className="mov" onClick={this.fns} id="mov">删除</button>
        						<button className="rev" onClick={this.fn} id="rev">修改</button>
        						<div className="pics"><img src={pp.pics}/></div>
        						
        					</div>)
        				
        			 }.bind(this))}
        			<div className="alert">
        				<p><input type="file" ref="fixedimg3" id="ppo"  onChange={this.setFiles.bind(null,this.refs.fixedimg3)}    multiple="multiple"/></p>
        				<div className="tit">title:<input type="text" id="ftext"/></div>
        				<button className="ok" onClick={this.ok} id="ok">确定</button>
        			</div>
        			</ul>
        		</div>
        		<div className="add_box">
        			<p><input type="file" ref="fixedimg2"  onChange={this.setFiles.bind(null,this.refs.fixedimg2)}    multiple="multiple" id="btn"/></p>
        			<div className="tit">title:<input type="text" id="bb"/></div>
        			<button className="ok" onClick={this.yes} id="ok">确定</button>
        		</div>
        	</div>    
        )
    }
}
export default Vi;
