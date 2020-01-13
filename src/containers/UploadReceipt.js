import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import { Button } from 'semantic-ui-react'


export class UploadReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ""
        };
    }
    onDrop = (acceptedFiles) => {
        this.setState({ image: acceptedFiles[0] })
        this.props.onImageUpload(this.state.image)
    }

    render() {
        return (
            <Dropzone onDrop={this.onDrop} accept="image/png, image/gif,image/jpg,image/jpeg" >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {this.state.image === "" ? <Button>Click here to upload an Image</Button> : <><Button>Click here to upload another Image</Button><h6>Image Uploaded !</h6> </>}
                    </div>
                )}
            </Dropzone>
        );
    }
}

export default UploadReceipt
