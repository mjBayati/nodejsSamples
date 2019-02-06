import React from 'react';

class Main extends React.Component{
    constructor (props){
        super(props);

        this.state = {
            imageUrl: ''
        };

        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    handleImageUpload(event){
        event.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('fileName', this.fileName.value);

        fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({imageUrl: `http://localhost:8000/${body.file}`});
            });
        });
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