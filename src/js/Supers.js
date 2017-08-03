import React, { Component } from 'react';
import $ from 'jquery';
import './../css/news.css';
import conf from './../config';
class Supers extends Component {
	constructor(){
       super();
       this.state={
            supers:[]  ,
            id:null   
       };
    };
	componentDidMount(){
        $.ajax({
            type:"post",
            url:`${conf.url}/tianfang/supers`,
            async:"true",
            success:function(pp){
            console.log(pp)
                this.setState({
                    supers:pp
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
            url: `${conf.url}/tianfang/super_file`,
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function(e) {
                $.ajax({
                    type: "post",
                    url: `${conf.url}/tianfang/upsuper_img`,
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
		$('.wrap').css({
			'display':"none"
		})
    }.bind(this);
    fns=function(event){
		var aa=event.target
		var id=aa.parentElement.firstElementChild.innerHTML
			$.ajax({
				type:"post",
				url:`${conf.url}/tianfang/dlcases_supers`,
				data:{"id":id},
				success:function(e){				
				for(var i in this.state.supers){
						if(this.state.supers[i].id==id){
							var aa=this.state.supers.splice(i,1)
							this.setState({
								supers:this.state.supers
							})
						}
					}
				console.log(this.state.supers)
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
            url:`${conf.url}/tianfang/upsupers`,
            async:"true",
            data:{'id':this.state.id,"title":$("#text_supers").val()},
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
        				<li className="imgs">img</li>
        			{this.state.supers.map(function(pp,i){
        				return(<div key={i} className="wrap">
        						<div className="uids">{pp.id}</div>
        						<div className="word">{pp.super_word}</div>
        						<button className="mov" onClick={this.fns} id="mov">删除</button>
        						<button className="rev" onClick={this.fn} id="rev">修改</button>
        						<div className="pics"><img src={pp.super_img}/></div>
        						
        					</div>)
        				
        			 }.bind(this))}
        			<div className="alert">
        				<input type="file" ref="aes" onChange={this.setFiles.bind(null,this.refs.aes)} multiple="multiple" className="flie_img"/>
        				<div className="tit">title:<input type="text" id="text_supers"/></div>
        				<button className="ok" onClick={this.ok} id="ok">确定</button>
        			</div>
        			</ul>
        			
        		</div>
        	</div>    
        )
    }
}
export default Supers;