import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import { Button, Icon } from 'semantic-ui-react'
import '../App.css'


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
        if (this.props.receiptFormSubmitted) {
            this.setState({ image: "" })
            this.props.onSubmitReceiptForm()
        }
        return (
            <div className="centered">
                <Dropzone onDrop={this.onDrop} accept="image/png, image/gif,image/jpg,image/jpeg" >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {this.state.image === "" ?
                                <Button>
                                    <Icon name='upload' />
                                    Click here to upload an Image
                                </Button>
                                :
                                <>
                                    <Button>
                                        <Icon name='upload' />
                                        Change uploaded image
                                </Button>
                                </>}
                        </div>
                    )}
                </Dropzone>
            </div>
        );
    }
}

export default UploadReceipt
