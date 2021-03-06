import React, { Component } from 'react';
import $ from 'jquery';
import './../css/gold.css';
import conf from './../config';
class Design extends Component {
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
                    url:`${conf.url}/tianfang/upsuper_img`,
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
            url: `${conf.url}/tianfang/super_files`,
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function(e) {
                $.ajax({
                    type: "post",
                    url: `${conf.url}/tianfang/upsuper_imgs`,
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
        $('.wraps').css({
            'display':"block"
        })
         var title5 =$("#text_supers_in").val()
          if($("#text_supers_in").val() == "") {
            for(var i = 0; i < this.state.supers.length; i++) {
                if(this.state.supers[i].id == this.state.id) {
                    title5= this.state.supers[i].con
                }
            }
        }
         $.ajax({
            type:"post",
            url:`${conf.url}/tianfang/upsuperss`,
            async:"true",
            data:{'id':this.state.id,"title":title5},
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
                    {this.state.supers.map(function(pp,i){
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
                        <div className="tit">title:<input type="text" id="text_supers_in"/></div>
                        <button className="ok" onClick={this.ok} id="ok">确定</button>
                    </div>
                    </ul>
                    
                </div>
            </div>    
        )
    }
}
export default Design;