import React from 'react';
var FormData = require('form-data');

class Main extends React.Component{
    constructor (props){
        super(props);

        this.state = {
            imageUrl: ''
        };
        this.fileName = '';
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    handleImageUpload(event){
        event.preventDefault();

        let mms = new FormData();
        mms.append('file', this.uploadInput.files[0]);
        mms.append('filename', this.fileName.value);

        console.log(mms);

        // fetch('http://localhost:8000/upload', {
        //     method: 'POST',
        //     body: data,
        // }).then((response) => {
        //     response.json().then((body) => {
        //         this.setState({imageUrl: `http://localhost:8000/${body.file}`});
        //     });
        // });
    }
    

    render(){
        return(
            <form onSubmit={this.handleImageUpload}>
                <div>
                    <input ref={(ref) => {this.uploadInput = ref;}} type='file'/>
                </div>
                <div>
                    <input ref={(ref) => {this.fileName = ref;}} type='text' placeholder='enter file name'/>
                </div>
                <br/>
                <div>
                    <button>upload</button>
                </div>
                <img src={this.state.imageUrl} alt='prp'/>
            </form>
        );
    }
}

export default Main;