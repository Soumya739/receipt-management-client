import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import { Button, Icon, Form } from 'semantic-ui-react'
import '../App.css'
import axios from 'axios';



export class UploadReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ""
        };
    }

    onDrop = (acceptedFiles) => {
        this.setState({ image: acceptedFiles[0] })

    }

    handleSubmitImage = (e) => {
        e.preventDefault()
        this.props.onSetLoaderStatus()
        const formdata = new FormData(e.target)
        formdata.append('image', this.state.image)
        axios({
            method: 'post',
            url: 'http://localhost:3000/receipts',
            data: formdata,
            headers: {
                'Content-Type': 'multipart/form-data',
                Accepts: 'application/json',
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            let response = JSON.parse(res.data.imageData)
            if (response.status === "Running") {
                console.log(res)
            } else {
                console.log(response.recognitionResults[0].lines)
                this.setState({ image: "" })
                this.props.onImageUpload(response.recognitionResults[0].lines, res.data.receiptId)
            }
        })
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
                                <Button size={"large"}>
                                    <Icon name='upload' />
                                    Click here to upload an Image
                                </Button>
                                :
                                <>
                                    <Button size={"large"}>
                                        <Icon name='upload' />
                                        Change uploaded image
                                </Button>
                                </>}
                        </div>
                    )}
                </Dropzone>
                <Form onSubmit={(e) => this.handleSubmitImage(e)}>
                    <Button.Group>
                        {this.state.image === "" ? <Button negative disabled size={"large"}>Submit Image</Button> : <Button positive type="submit" size={"large"}>Submit Image</Button>}
                    </Button.Group>
                </Form>
            </div>
        );
    }
}

export default UploadReceipt
