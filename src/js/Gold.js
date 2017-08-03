import React, { Component } from 'react';
import $ from 'jquery';
import './../css/gold.css';
class Gold extends Component {
	constructor(){
       super();
       this.state={
            system:[]  ,
            id:null   
       };
    };
	componentDidMount(){
        $.ajax({
            type:"post",
            url:"http://localhost:8100/tianfang/system",
            async:"true",
            success:function(pp){
            console.log(pp)
                this.setState({
                    system:pp
                })
            }.bind(this),
            error:function(){
                alert('失败了');
            }
        });
    }
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
            url: "http://localhost:8100/tianfang/system_file",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function(e) {
                $.ajax({
                    type: "post",
                    url: "http://localhost:8100/tianfang/upsystem_img",
                    data: {
                        "id": this.state.id 
                    },
                    success: function(e) {
                        console.log(e)
                    }.bind(this),
                    error: function() {
                        console.log("666")
                    }
                });
            }.bind(this),
            error: function() {
                console.log("666")
            }
        });

    }.bind(this);
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
            url: "http://localhost:8100/tianfang/system_files",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function(e) {
                $.ajax({
                    type: "post",
                    url: "http://localhost:8100/tianfang/upsystem_imgs",
                    data: {
                        "id": this.state.id 
                    },
                    success: function(e) {
                        console.log(e)
                    }.bind(this),
                    error: function() {
                        console.log("666")
                    }
                });
            }.bind(this),
            error: function() {
                console.log("666")
            }
        });

    }.bind(this);
    fn=function(event){
    	var aa=event.target.parentElement.firstElementChild.innerHTML
    	this.setState({
    		id:aa
    	})
		$('.alert').css({
		'display':"block"
		})
		$('.wraps').css({
			'display':"none"
		})
    }.bind(this);
    fns=function(event){
		var aa=event.target
		var id=aa.parentElement.firstElementChild.innerHTML
			$.ajax({
				type:"post",
				url:"http://localhost:8100/tianfang/dlcases_system",
				data:{"id":id},
				success:function(e){				
				for(var i in this.state.system){
						if(this.state.system[i].id==id){
							var aa=this.state.system.splice(i,1)
							this.setState({
								system:this.state.system
							})
						}
					}
				console.log(this.state.system)
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
    	$('.wraps').css({
			'display':"block"
		})
    	 $.ajax({
            type:"post",
            url:"http://localhost:8100/tianfang/upsystems",
            async:"true",
            data:{'id':this.state.id,"title":$("#text_system_in").val()},
            success:function(pp){
            	console.log(pp)
            }.bind(this),
            error:function(){
                alert('失败了');
            }
        });
    }.bind(this);
    render() {
        return (
        	<div className="box">
        		
        		<div className="box_bottom">
        			<ul>
						<li className="uid">id</li>
        				<li className="title">title</li>
        				<li className="imgss">img</li>
                			{this.state.system.map(function(pp,i){
                				return(<div key={i} className="wraps">
                						<div className="uidss">{pp.id}</div>
                						<div className="words">{pp.con}</div>
                						<button className="mov" onClick={this.fns} id="mov">删除</button>
                						<button className="rev" onClick={this.fn} id="rev">修改</button>
                						<div className="picss">
                                            {pp.more.split('?').map(function(oo,i){
                                            return <img key={i} src={'http://localhost:8100/images/'+oo} alt="" />
                                            })}

                                        </div>                					
                					</div>)                				
                			 }.bind(this))}
            			<div className="alert">
            				<input type="file" ref="aes" onChange={this.setFiles.bind(null,this.refs.aes)} multiple="multiple" className="flie_img"/>
            				<div className="tit">title:<input type="text" id="text_system_in"/></div>
            				<button className="ok" onClick={this.ok} id="ok">确定</button>
            			</div>
        			</ul>
        			
        		</div>
        	</div>    
        )
    }
}
export default Gold;