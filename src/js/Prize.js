import React, { Component } from 'react';
import $ from 'jquery';
import './../css/gold.css';
import conf from './../config';
class Prize extends Component {
	constructor(){
       super();
       this.state={
            prize:[]  ,
            id:null   
       };
    };
	componentDidMount(){
        $.ajax({
            type:"post",
            url:`${conf.url}/tianfang/prize`,
            async:"true",
            success:function(pp){
     			console.log(pp)
                this.setState({
                    prize:pp
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
		$('.wraps').css({
			'display':"none"
		})
    }.bind(this);
    fns=function(event){
		var aa=event.target
			var  id=aa.parentElement.firstElementChild.innerHTML
			$.ajax({
				type:"post",
				url:`${conf.url}/tianfang/dlcases8`,
				data:{"id":id},
				success:function(e){				
				for(var i in this.state.prize){
						if(this.state.prize[i].id==id){
							var aa=this.state.prize.splice(i,1)
							this.setState({
								prize:this.state.prize
							})
						}
					}
				console.log(this.state.prize)
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
            url:`${conf.url}/tianfang/upprizes_prize`,
            async:"true",
            data:{'id':this.state.id,"title":$("#ptext_prize").val()},
            success:function(pp){
            	console.log(pp)
                alert(pp)
            }.bind(this),
            error:function(){
                alert('失败了');
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
                url:`${conf.url}/tianfang/accases2`,
                data:{"text":$("#th_prize").val()},
                success:function(e){                
                alert(e)
            }.bind(this),
            error:function(){
                console.log("失败了")
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
            url: `${conf.url}/tianfang/incases8`,
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function(e) {
                if(element.id=="ppo"){
                $.ajax({
                    type: "post",
                    url: `${conf.url}/tianfang/alcases8`,
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
            url: `${conf.url}/tianfang/incases11`,
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function(e) {
                if(element.id=="ppo"){
                $.ajax({
                    type: "post",
                    url: `${conf.url}/tianfang/alcases12`,
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

    }.bind(this);
    render() {
        return (
        	<div className="box">
        		
        		<div className="box_bottom">
                <div className="add" onClick={this.add}>+</div> 
        			<ul>
						<li className="uid">id</li>
        				<li className="title">title</li>
        				<li className="imgs">img</li>
        			{this.state.prize.map(function(pp,i){
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
        				<p><input type="file" ref="fixedimg3" id="ppo"  onChange={this.setFiles.bind(null,this.refs.fixedimg3)}    multiple="multiple"/></p>
        				<div className="tit">title:<input type="text" id="ptext_prize"/></div>
        				<button className="ok" onClick={this.ok} id="ok">确定</button>
        			</div>
        			</ul>	
        		</div>
                <div className="add_box">
                    <p><input type="file" ref="fixedimg2"  onChange={this.setFiles.bind(null,this.refs.fixedimg2)}    multiple="multiple" id="btn"/></p>
                    <div className="tit">title:<input type="text" id="th_prize"/></div>
                    <button className="ok" onClick={this.yes} id="ok">确定</button>
                </div>
        	</div>    
        )
    }
}
export default Prize;
