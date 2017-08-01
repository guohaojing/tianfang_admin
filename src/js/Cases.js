import React, { Component } from 'react';
import $ from 'jquery';

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
				url:"http://localhost:8100/tianfang/dlcases1",
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
            url:"http://localhost:8100/tianfang/upprize",
            async:"true",
            data:{'id':this.state.id,"title":$("#atext").val()},
            success:function(pp){
            	console.log(pp)
                alert(pp)
            }.bind(this),
            error:function(){
                alert('失败了');
            }
        });
    }.bind(this)
    render() {
        return (
        	<div classname="box">
        		
        		<div className="box_bottom">
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
        				<input type="file" multiple="multiple" className="flie_img"/>
        				<div className="tit">title:<input type="text" id="atext"/></div>
        				<button className="ok" onClick={this.ok} id="ok">确定</button>
        			</div>
        			</ul>
        			
        		</div>
        	</div>    
        )
    }
}
export default Cases;
