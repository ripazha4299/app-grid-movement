import React from "react";

class GridApp extends React.Component{
    state={
        size:10
    }    ;
    
    inputUpdate = this.inputUpdate.bind(this);

    componentDidMount(){
        var i;
        for(i=0;i<100;i++){
            this.dragElement(document.getElementById('block'+i));
        }
    }    
    inputUpdate(){
        var val = document.getElementById('input').value
        val=parseInt(val);
        if(val<1){
            alert("Enter a positive size");
            return
        }
        else{
        this.setState({size:val})
        }
        // this.state.size=val;
    }
    dragElement(element) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        function mouseStarted(e) {
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            console.log('progressing');
            e = e || window.event;
            // e.preventDefault();
            element.classList.add('opacity');
        }

        function mouseStart(e){
            element.classList.add('opacity');
            console.log("Started");
            pos3 = e.clientX;
            pos4 = e.clientY;
            if(document.elementsFromPoint(pos3, pos4).length>5){
                console.log('final',pos3,pos4);
                var ele2 = document.elementFromPoint(pos3, pos4);
                if(ele2 != element){
                    var initPos = element.style.transform;
                    var finalPos = ele2.style.transform; 
                    console.log(initPos,finalPos)
                    element.style.transform=finalPos; 
                    ele2.style.transform=initPos;
                }
            }
            document.onmouseup = null;
            document.onmousemove = null;
            // element.classList.remove('opacity');
        }
    
        function closeDragElement(e) {
            console.log("Stopped!")
            // pos3 = e.clientX;
            // pos4 = e.clientY;
            // if(document.elementsFromPoint(pos3, pos4).length>5){
            //     console.log('final',pos3,pos4);
            //     var ele2 = document.elementFromPoint(pos3, pos4);
            //     var initPos = element.style.transform;
            //     var finalPos = ele2.style.transform; 
            //     console.log(initPos,finalPos)
            //     element.style.transform=finalPos; 
            //     ele2.style.transform=initPos;
            // }
            // document.onmouseup = null;
            // document.onmousemove = null;
            element.classList.remove('opacity');
        }

        element.ondrag = mouseStart;
        element.ondragend = closeDragElement;
        
    }

    
    
    render (){
        return(
            <React.Fragment>

                Enter the size of grid: <input id='input' onKeyUp={this.inputUpdate}></input>
                
                <div className="grids">
                {/* {
                    ([...Array(this.state.size*this.state.size)]).map((val,index) => {
                        return (
                            <div className={"grid grid"+index}>
                                
                            </div>
                        )
                    })
                } */}
                {
                    ([...Array(this.state.size*this.state.size)]).map((val,index) => {
                        var x,y;
                        y=(index)%this.state.size*62;
                        x=parseInt((index)/this.state.size)*62;

                        return (
                            <div className={"grid blocks "+index} id={"block"+index} draggable
                             style={{'transform':'translate('+y+'px, '+x+'px)'}}>
                                {index+1}
                            </div>
                        )
                    })
                }
                </div>
            </React.Fragment>
        )
    }
}

export default GridApp;