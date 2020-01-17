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
            console.log(res)
            this.setState({ image: "" })
            this.props.onImageUpload(res.data.image.url)
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
                <Form onSubmit={(e) => this.handleSubmitImage(e)}>
                    <Button.Group>
                        {this.state.image === "" ? <Button negative disabled>Submit Image</Button> : <Button positive type="submit">Submit Image</Button>}
                    </Button.Group>
                </Form>
            </div>
        );
    }
}

export default UploadReceipt
