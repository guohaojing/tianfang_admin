import React, { Component } from 'react';
import $ from 'jquery';
import './../css/news.css';
class Cases extends Component {
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
            url:"http://localhost:8100/tianfang/prize",
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
		$('.wrap').css({
			'display':"none"
		})
    }.bind(this);
    fns=function(event){
		var aa=event.target
			var  id=aa.parentElement.firstElementChild.innerHTML
			$.ajax({
				type:"post",
				url:"http://localhost:8100/tianfang/dlcases8",
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
            url:"http://localhost:8100/tianfang/upprizes",
            async:"true",
            data:{'id':this.state.id,"title":$("#ptext").val()},
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
                url:"http://localhost:8100/tianfang/accases2",
                data:{"text":$("#th").val()},
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
            url: "http://localhost:8100/tianfang/incases8",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function(e) {
                if(element.id=="ppo"){
                $.ajax({
                    type: "post",
                    url: "http://localhost:8100/tianfang/alcases8",
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
    render() {
        return (
        	<div classname="box">
        		
        		<div className="box_bottom">
                <div className="add" onClick={this.add}>+</div> 
        			<ul>
						<li className="uid">id</li>
        				<li className="title">title</li>
        				<li className="imgs">img</li>
        			{this.state.prize.map(function(pp,i){
        				return(<div key={i} className="wrap">
        						<div className="uids">{pp.id}</div>
        						<div className="word">{pp.prize_word}</div>
        						<button className="mov" onClick={this.fns} id="mov">删除</button>
        						<button className="rev" onClick={this.fn} id="rev">修改</button>
        						<div className="pics"><img src={pp.prize_img}/></div>
        						
        					</div>)
        				
        			 }.bind(this))}
        			<div className="alert">
        				<p><input type="file" ref="fixedimg3" id="ppo"  onChange={this.setFiles.bind(null,this.refs.fixedimg3)}    multiple="multiple"/></p>
        				<div className="tit">title:<input type="text" id="ptext"/></div>
        				<button className="ok" onClick={this.ok} id="ok">确定</button>
        			</div>
        			</ul>	
        		</div>
                <div className="add_box">
                    <p><input type="file" ref="fixedimg2"  onChange={this.setFiles.bind(null,this.refs.fixedimg2)}    multiple="multiple" id="btn"/></p>
                    <div className="tit">title:<input type="text" id="th"/></div>
                    <button className="ok" onClick={this.yes} id="ok">确定</button>
                </div>
        	</div>    
        )
    }
}
export default Cases;
