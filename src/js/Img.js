import React, { Component } from 'react';
import $ from 'jquery';
import '.././css/img.css';

class Img extends Component {
	constructor(){
       super();
       this.state={
            img:[]  ,
            id:null   
       };
    };
	componentDidMount(){
        $.ajax({
            type:"get",
            url:"http://localhost:8100/tianfang/img",
            async:"true",
            success:function(pp){
     console.log(pp)
                this.setState({
                    img:pp
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
                url:"http://localhost:8100/tianfang/dlcases12",
                data:{"id":id},
                success:function(e){                
                for(var i in this.state.img){
                        if(this.state.img[i].id==id){
                            var aa=this.state.img.splice(i,1)
                            this.setState({
                                img:this.state.img
                            })
                        }
                    }
                console.log(this.state.img)
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
            url:"http://localhost:8100/tianfang/upprize12",
            async:"true",
            data:{'id':this.state.id},
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
            url: "http://localhost:8100/tianfang/incases12",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function(e) {
                if(element.id=="bbo"){
                    $.ajax({
                    type: "post",
                    url: "http://localhost:8100/tianfang/alcases12",
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
                url:"http://localhost:8100/tianfang/accases12",
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
        				<li className="imgs">img</li>
        			{this.state.img.map(function(pp,i){
        				return(<div key={i} className="wrap">
        						<div className="uids">{pp.id}</div>
        						<button className="mov" onClick={this.fns} id="mov">删除</button>
        						<button className="rev" onClick={this.fn} id="rev">修改</button>
        						<div className="lb_img"><img src={pp.img}/></div>        						
        					</div>)
        			 }.bind(this))}
                        <div className="alert">
                            <p><input type="file" ref="fixedimg7" id="bbo"  onChange={this.setFiles.bind(null,this.refs.fixedimg7)}    multiple="multiple"/></p>
                            <button className="ok" onClick={this.ok} id="ok">确定</button>
                        </div>
                    </ul>
                </div>
                <div className="add_box">
                    <p><input type="file" ref="fixedimg4"  onChange={this.setFiles.bind(null,this.refs.fixedimg4)}    multiple="multiple" id="btn"/></p>
                    <button className="ok" onClick={this.yes} id="ok">确定</button>
                </div>
        	</div>    
        )
    }
}
export default Img;
