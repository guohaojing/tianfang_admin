import React, { Component } from 'react';
import $ from 'jquery';

class Cases2 extends Component {
	constructor(){
       super();
       this.state={
            cont:[]  ,
            id:null   
       };
    };
	componentDidMount(){
        $.ajax({
            type:"post",
            url:"http://localhost:8100/tianfang/cont",
            async:"true",
            success:function(pp){
                this.setState({
                    cont:pp
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
				url:"http://localhost:8100/tianfang/dlcases2",
				data:{"id":id},
				success:function(e){				
				for(var i in this.state.cont){
						if(this.state.cont[i].id==id){
							var aa=this.state.cont.splice(i,1)
							this.setState({
								cont:this.state.cont
							})
						}
					}
				console.log(this.state.cont)
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
            url:"http://localhost:8100/tianfang/upcont",
            async:"true",
            data:{'id':this.state.id,"title":$("#ytext").val(),"eng":$("#xtext").val()},
            success:function(pp){
            	alert(pp)
            }.bind(this),
            error:function(){
                alert('失败了');
            }
        });
    }.bind(this);

    render() {
        return (
        	<div classname="box">
        		<div className="box_bottom">
        			<ul>
						<li className="uid">id</li>
        				<li className="title">title</li>
        				<li className="eng">eng</li>
        				<li className="img">img</li>
        			{this.state.cont.map(function(pp,i){
        				return(<div key={i} className="wrap">
        						<div className="uids">{pp.id}</div>
        						<div className="word">{pp.title}</div>
        						<button className="mov" onClick={this.fns} id="mov">删除</button>
        						<button className="rev" onClick={this.fn} id="rev">修改</button>
        						<div className="pic"><img src={pp.img}/></div>
        						<div className="engs">{pp.eng}</div>
        						
        					</div>)
        				
        			 }.bind(this))}
        			<div className="alert">
        				<input type="file" multiple="multiple" className="flie_img"/>
        				<div className="tit">title:<input type="text" id="ytext"/></div>
        				<div className="engo">eng:<input type="text" id="xtext"/></div>
        				<button className="ok" onClick={this.ok} id="ok">确定</button>
        			</div>
        			</ul>
        			
        		</div>
        	</div>    
        )
    }
}
export default Cases2
